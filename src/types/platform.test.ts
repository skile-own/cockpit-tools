import assert from 'node:assert/strict';
import test from 'node:test';
import { ALL_PLATFORM_IDS, isMenuVisiblePlatform, type PlatformId } from './platform';
import { isMainWindowNavigablePage } from './navigation';

test('polls offers only Codex, Antigravity and ZCode, including their feature pages', () => {
  assert.deepEqual(ALL_PLATFORM_IDS, ['codex', 'codex_api_service', 'antigravity', 'antigravity_ide', 'zcode']);
});

test('retired platforms cannot be restored to the menu or opened from tray navigation', () => {
  for (const id of ['claude_manager', 'zed', 'github-copilot', 'windsurf', 'kiro', 'cursor', 'grok', 'codebuddy', 'codebuddy_cn', 'qoder', 'trae', 'trae_solo', 'trae_cn', 'trae_solo_cn', 'workbuddy']) {
    assert.equal(isMenuVisiblePlatform(id as PlatformId), false, id);
  }
  for (const page of ['claude', 'claude-cli', 'zed', 'github-copilot', 'windsurf', 'kiro', 'cursor', 'grok', 'codebuddy', 'codebuddy-cn', 'qoder', 'trae', 'trae-solo', 'trae-cn', 'trae-solo-cn', 'workbuddy', 'api-relay']) {
    assert.equal(isMainWindowNavigablePage(page), false, page);
  }
  for (const page of ['codex', 'codex-api-service', 'overview', 'zcode', 'settings', 'dashboard']) {
    assert.equal(isMainWindowNavigablePage(page), true, page);
  }
});
