document.addEventListener('DOMContentLoaded', function () {
    // 颜色数组
    var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    // 定时触发烟花效果
    setInterval(function () {
        for (var i = 0; i < 10; i++) { // 创建10个烟花
            setTimeout(addFirework, i * 100); // 每个烟花的延迟时间递增，模拟散开效果
        }
    }, 2000); // 每2秒触发一次烟花效果

    // 添加烟花效果的函数
    function addFirework() {
        var firework = document.createElement('div');
        firework.className = 'firework';

        // 设置烟花的位置
        firework.style.left = Math.random() * (window.innerWidth - firework.offsetWidth) + 'px';
        firework.style.top = Math.random() * (window.innerHeight - firework.offsetHeight) + 'px';


        // 随机选择一个颜色
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // 将烟花添加到body中
        document.body.appendChild(firework);

        // 在动画结束后移除烟花
        firework.addEventListener('animationend', function () {
            document.body.removeChild(firework);
        });
    }
});
