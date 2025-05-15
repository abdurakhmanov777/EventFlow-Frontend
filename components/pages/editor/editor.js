export function editorBot(param) {
    const lang = localStorage.getItem('language') || 'ru';
    const data = JSON.parse(sessionStorage.getItem(`lang_${lang}`));

    document.querySelector('#root').innerHTML = `
        <div id='editorSection' class='full-page'>
            <h2>${param.name}</h2>
            <canvas id="canvas"></canvas>
            <div id="buttonsContainer">
                <button id="addRect">
                    ${data?.editor.buttons.add}
                </button>
                <button id="exportJson">
                    ${data?.editor.buttons.save}
                </button>
            </div>
        </div>
    `;

    if (typeof fabric === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
        script.onload = initEditor;
        document.head.appendChild(script);
    } else {
        initEditor();
    }

    function initEditor() {
        const canvasEl = document.getElementById('canvas');
        const editorSection = document.getElementById('editorSection');
        const buttonsContainer = document.getElementById('buttonsContainer');

        // const canvas = new fabric.Canvas('canvas');
        const canvas = new fabric.Canvas('canvas', {
            selection: false // отключает групповое выделение
        });


        function resizeCanvas() {
            // Ширина = ширине editorSection
            const width = editorSection.clientWidth;

            // Высота = высоте editorSection минус высота кнопок и отступы
            const buttonsHeight = buttonsContainer.offsetHeight; // 10px margin-top
            const h2Height = editorSection.querySelector('h2').offsetHeight;
            const totalHeight = editorSection.clientHeight;

            const height = totalHeight - buttonsHeight - h2Height - 20; // 20px дополнительный отступ сверху/снизу

            // Устанавливаем размеры холста и у Fabric
            canvasEl.width = width;
            canvasEl.height = height;
            canvas.setWidth(width);
            canvas.setHeight(height);

            canvas.renderAll();
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let rectCount = 0;

        document.getElementById('addRect').addEventListener('click', () => {
            rectCount += 1;

            const rect = new fabric.Rect({
                width: 80,
                height: 60,
                fill: 'grey',
                originX: 'center',
                originY: 'center'
            });

            const label = new fabric.Text(rectCount.toString(), {
                fontSize: 20,
                fill: 'white',
                originX: 'center',
                originY: 'center'
            });

            const group = new fabric.Group([rect, label], {
                left: 100,
                top: 100,
                hasControls: false,
                lockRotation: true,
                lockScalingX: true,
                lockScalingY: true,
                hasRotatingPoint: false,
                selectable: true
            });

            canvas.add(group);
        });
    }
}
