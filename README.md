# preload

```javascript
import preload from "@g1100100/preload";

preload.Load({
            images: [
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607958222376&di=8435b38948f88a4a3b53bd8b9c50371e&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F19%2F211608ztcq7higicydxhsy.jpg",
            ],
            sounds: [
                ""
            ],
            onprogress: (progress) => {
                console.warn("进度" + progress);
            },
            abortOnFail: true,
            onabort: () => {
                console.warn("中止");
            },
            oncomplete: () => {
                console.info("完成");
            },
        });

```
