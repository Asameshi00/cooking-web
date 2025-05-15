HOST = HOST
COOKING_APP = cooking-app
SRC = $(COOKING_APP)/src

.PHONY: help
help:
	@echo "使用可能なコマンド"
	@echo "Usage:"
	@echo "  build           : アプリケーションのビルド"
	@echo "  run             : アプリケーションの実行"
	@echo "  test            : テストの実行"
	@echo "  install         : 依存関係のインストール"
	@echo "  uninstall       : 依存関係のアンインストール"
	@echo "  clean           : 依存関係をクリーンアップ"
	@echo "  lint            : コードのリント"
	@echo "  list            : すべての依存関係を確認"
	@echo "  check-old       : 古くなった依存をチェック"
	@echo "  check-unused    : 未使用の依存をチェック"
	@echo "  update          : 古い依存関係を最新バージョンに更新"
	@echo "  audit           : 依存関係の監査"
	@echo "  help            : このヘルプメッセージを表示"

.PHONY: build
build:
	@echo "=== アプリケーションのビルド ==="
	cd $(COOKING_APP) && npm run build
	@echo "Build complete."

.PHONY: run
run: build
	@echo "=== アプリケーションの実行 ==="
	unset HOST && cd $(COOKING_APP) && npm start
	@echo "Execution complete."

.PHONY: test
test:
	@echo "=== テストの実行 ==="
	cd $(COOKING_APP) && npm test
	@echo "Test complete."

.PHONY: install
install:
	@echo "=== 依存関係のインストール ==="
	@if [ "$(filter-out $@,$(MAKECMDGOALS))" != "" ]; then \
		echo "Installing packages: $(filter-out $@,$(MAKECMDGOALS))"; \
		cd $(COOKING_APP) && npm install $(filter-out $@,$(MAKECMDGOALS)); \
	else \
		echo "Installing all dependencies"; \
		cd $(COOKING_APP) && npm install; \
	fi
	@echo "Install complete."

.PHONY: uninstall
uninstall:
	@echo "=== 依存関係のアンインストール ==="
	@if [ "$(filter-out $@,$(MAKECMDGOALS))" != "" ]; then \
		echo "Uninstalling packages: $(filter-out $@,$(MAKECMDGOALS))"; \
		cd $(COOKING_APP) && npm uninstall $(filter-out $@,$(MAKECMDGOALS)); \
	else \
		echo "Uninstalling all dependencies"; \
		cd $(COOKING_APP) && npm uninstall; \
	fi
	@echo "Uninstall complete."

.PHONY: clean
clean:
	@echo "=== 依存関係をクリーンアップ ==="
	cd $(COOKING_APP) && npm prune && npm cache clean --force
	@echo "Clean up dependencies."

.PHONY: lint
lint:
	@echo "=== コードのリント ==="
	cd $(COOKING_APP) && npm run lint
	@echo "Lint complete."

.PHONY: list
list:
	@echo "=== 直接依存している依存関係を確認 ==="
	cd $(COOKING_APP) && npm list --depth=0
	@echo "=== すべての依存関係を確認 ==="
	cd $(COOKING_APP) && npm list
	@echo "List dependencies."

.PHONY: check-old
check:
	@echo "=== 古くなった依存をチェック ==="
	cd $(COOKING_APP) && npm outdated
	@echo "Check complete."

.PHONY: check-unused
check-unused:
	@echo "=== 未使用の依存をチェック ==="
	cd $(COOKING_APP) && npx depcheck
	@echo "Check complete."

.PHONY: audit
audit:
	@echo "=== 依存関係の監査 ==="
	cd $(COOKING_APP) && npm audit
	@echo "Audit complete."

.PHONY: update
update:
	@echo "=== 依存関係を最新バージョンに更新 ==="
	cd $(COOKING_APP) && npm update
	@echo "Update complete."

# 引数をそのまま渡すための設定
%:
	@:
