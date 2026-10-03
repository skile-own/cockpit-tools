import assert from 'node:assert/strict';
import test from 'node:test';
import { ALL_PLATFORM_IDS } from '../src/types/platform';

test('old layouts drop retired providers while preserving supported account groups', async () => {
  const oldLayout = JSON.stringify({
    apiRelaySidebarVisible: true,
    apiRelayDashboardVisible: true,
    orderedPlatformIds: ['claude_manager', 'codex', 'antigravity', 'windsurf', 'trae', 'zcode'],
    trayPlatformIds: ['codex', 'antigravity', 'windsurf', 'trae', 'zcode'],
    platformGroups: [
      { id: 'mixed', name: 'My accounts', platformIds: ['windsurf', 'codex'], defaultPlatformId: 'windsurf' },
      { id: 'antigravity-suite', name: 'Antigravity', platformIds: ['antigravity', 'antigravity_ide'], defaultPlatformId: 'antigravity_ide' },
      { id: 'trae-suite', name: 'Trae', platformIds: ['trae', 'trae_solo'], defaultPlatformId: 'trae' },
    ],
    orderedEntryIds: ['group:mixed', 'group:trae-suite', 'group:antigravity-suite', 'platform:zcode'],
  });
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: (key: string) => key === 'agtools.platform_layout.v1' ? oldLayout : null },
  });
  try {
    const { usePlatformLayoutStore, parsePlatformEntryId } = await import('../src/stores/usePlatformLayoutStore');
    const state = usePlatformLayoutStore.getState();
    assert.equal(state.apiRelaySidebarVisible, false);
    assert.equal(state.apiRelayDashboardVisible, false);
    for (const id of [...state.orderedPlatformIds, ...state.trayPlatformIds, ...state.sidebarPlatformIds]) {
      assert.ok(ALL_PLATFORM_IDS.includes(id), `retired platform ${id} survived migration`);
    }
    for (const group of state.platformGroups) {
      assert.ok(group.platformIds.every((id) => ALL_PLATFORM_IDS.includes(id)), group.id);
      assert.ok(group.platformIds.includes(group.defaultPlatformId), group.id);
    }
    assert.ok(state.orderedPlatformIds.includes('zcode'));
    assert.equal(state.platformGroups.find((group) => group.id === 'mixed')?.defaultPlatformId, 'codex');
    assert.equal(parsePlatformEntryId('platform:trae'), null);
    assert.equal(parsePlatformEntryId('platform:codex'), 'codex');
  } finally {
    if (original) Object.defineProperty(globalThis, 'localStorage', original);
    else Reflect.deleteProperty(globalThis, 'localStorage');
  }
});
