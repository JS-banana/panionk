#!/usr/bin/env bash
# 构建静态产物并发布到 claw 服务器。
#
#   pnpm ship      发布（不叫 deploy 是因为 pnpm 有同名内置命令）
#   pnpm rollback  回滚到上一个版本
#
# 服务器上的布局：
#   /srv/panionk/releases/<时间戳>/   每次发布的产物
#   /srv/panionk/current -> releases/<时间戳>   nginx 的 root 指向这里
# 切换是原子的（软链替换），保留最近 5 个版本便于回滚。

set -euo pipefail

HOST=claw
REMOTE_ROOT=/srv/panionk
KEEP=5

if [[ "${1:-}" == "--rollback" ]]; then
  ssh "$HOST" "
    set -e
    cd $REMOTE_ROOT/releases
    current=\$(basename \$(readlink $REMOTE_ROOT/current))
    previous=\$(ls -1 | sort -r | grep -v \"^\$current\$\" | head -1)
    if [[ -z \"\$previous\" ]]; then echo '没有可回滚的版本'; exit 1; fi
    ln -sfn $REMOTE_ROOT/releases/\$previous $REMOTE_ROOT/current
    echo \"已回滚到 \$previous\"
  "
  exit 0
fi

RELEASE=$(date +%Y%m%d-%H%M%S)

echo "==> 构建"
rm -rf .next out
pnpm build

if [[ ! -f out/index.html ]]; then
  echo "构建产物缺少 out/index.html，中止" >&2
  exit 1
fi

echo "==> 上传 $RELEASE"
ssh "$HOST" "mkdir -p $REMOTE_ROOT/releases/$RELEASE"
rsync -az --delete out/ "$HOST:$REMOTE_ROOT/releases/$RELEASE/"

echo "==> 切换并清理旧版本"
ssh "$HOST" "
  set -e
  ln -sfn $REMOTE_ROOT/releases/$RELEASE $REMOTE_ROOT/current
  cd $REMOTE_ROOT/releases && ls -1 | sort -r | tail -n +$((KEEP + 1)) | xargs -r rm -rf
  ls -1 $REMOTE_ROOT/releases
"

echo "==> 验证"
curl -sS -o /dev/null -w "https://laifuyou.com/ %{http_code}\n" "https://laifuyou.com/?cb=$RELEASE"

echo "==> 完成 $RELEASE"
