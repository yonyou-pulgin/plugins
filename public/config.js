// 保存旧的html代码字符串
let oldHtml;
let timestamp = null;
let requestCount = 0;

// 从服务端获取最新的html代码
async function fetchHtml() {
    // 加上时间戳避免缓存
    return await fetch(`/plugin/version.txt?timestamp=${+new Date()}`)
        .then(res => res.text())
}

// 判断需不需要更新
async function needUpdate() {
    const newHtml = await fetchHtml()
    console.log('newHtml', newHtml)
    // 默认不需要更新
    let result = false
    if (oldHtml && oldHtml !== newHtml) {
        // 有旧值，并且新旧值不同，才需要更新
        result = true
    }
    // 没有旧值，或者新旧值一样，就无需更新
    
    // 无论用户更不更新版本，都更新旧值，
    // 这样当用户选择不更新时就不会再提示了
    // 除非刷新页面
    oldHtml = newHtml
    return result
}

// 递归调用，3秒一次
function autoRefresh() {
    if (timestamp && requestCount > 9) {
        // 已经有定时器了，就不再创建了
      clearTimeout(timestamp)
      return
    }
    requestCount++;
    timestamp = setTimeout(async () => {
        if (await needUpdate()) {
           alert("新版本页面已可用，即将为您刷新！");
           timestamp = null;
           requestCount = 0;
           window.location.reload();
        }
        autoRefresh()
    }, 3000)
}

autoRefresh()
