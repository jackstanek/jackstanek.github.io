(function() {
    const config = {
        MAX_SPEED: 0.2,
        MAX_DT: 100,           // milliseconds
        AVG_LIFETIME: 3000,    // milliseconds
        STDDEV_LIFETIME: 750,  // milliseconds
        AVG_COOLDOWN: 500,     // milliseconds
        STDDEV_COOLDOWN: 100,  // milliseconds
        FADE_TIME: 750,        // milliseconds
        NUM_FIREFLIES: 150,
        VISCOSITY: 0.97,
    };

    let ctx = null, fireflies = [];

    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }

    Vec2.prototype.norm = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    Vec2.prototype.normalize = function() {
        let c = this.norm();
        return this.div(c);
    }

    Vec2.prototype.normalized = function() {
        let c = this.norm();
        return new Vec2(this.x / c, this.y / c);
    }

    Vec2.prototype.scaled = function(c) {
        return new Vec2(this.x * c, this.y * c);
    }

    Vec2.prototype.scaleTo = function(c) {
        return this.normalized().scaled(c);
    }

    Vec2.prototype.clampAt = function(c) {
        if (this.norm() > c) {
            this.normalize().mul(c);
        }

        return this;
    }

    Vec2.prototype.to = function(v) {
        return new Vec2(v.x - this.x, v.y - this.y);
    }

    Vec2.prototype.distanceTo = function(v) {
        return this.to(v).norm();
    }

    Vec2.prototype.copy = function() {
        return new Vec2(this.x, this.y);
    }

    Vec2.prototype.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    Vec2.prototype.sub = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    Vec2.prototype.mul = function(c) {
        this.x *= c;
        this.y *= c;
        return this;
    }

    Vec2.prototype.div = function(c) {
        this.x /= c;
        this.y /= c;
        return this;
    }

    Vec2.prototype.set = function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    let screenCenter = new Vec2(window.innerWidth, window.innerHeight).div(2);

    const normalDistribution = (mean, stddev) => {
        let u1 = Math.random(), u2 = Math.random();
        let n = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return mean + stddev * n;
    }

    const randomVec2 = (minX, maxX, minY, maxY, randomfn=Math.random) => {
        return new Vec2(minX + randomfn() * (maxX - minX),
                        minY + randomfn() * (maxY - minY));
    }

    const randomScreenPos = () => randomVec2(0, window.innerWidth, 0, window.innerHeight);

    function Firefly(i, w, h) {
        this.id = i;
        this.pos = randomVec2(0, w, 0, h);

        this.vel = randomVec2(-1, 1, -1, 1).scaleTo(config.MAX_SPEED);

        this.max_lifetime = Math.max(0, normalDistribution(config.AVG_LIFETIME, config.STDDEV_LIFETIME));
        this.lifetime = 0;

    }

    Firefly.prototype.update = function(dt) {
        this.vel.mul(config.VISCOSITY);

        this.pos.x = (this.pos.x + this.vel.x * dt) % window.innerWidth;
        this.pos.y = (this.pos.y + this.vel.y * dt) % window.innerWidth;

        this.lifetime += dt;
    }

    const fitCanvasToWindow = canvas => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        screenCenter.set(innerWidth / 2, innerHeight / 2);
    }

    const initCanvas = canvasId => {
        let canvas = document.getElementById(canvasId)
        fitCanvasToWindow(canvas);
        window.addEventListener("resize", () => fitCanvasToWindow(canvas));

        return canvas.getContext("2d");
    }

    const initFireflies = (w, h) => {
        let fireflies = [];

        for (let i = 0; i < config.NUM_FIREFLIES; i++) {
            fireflies.push(new Firefly(i, w, h));
        }

        return fireflies;
    }

    const drawFirefly = b => {
        ctx.beginPath();

        let opacity = Math.min(1, (b.max_lifetime - b.lifetime) / config.FADE_TIME,
                                  b.lifetime / config.FADE_TIME);
        ctx.fillStyle = "rgba(200, 200, 200, " + opacity + ")";
        ctx.arc(b.pos.x, b.pos.y, 1, 0, 2 * Math.PI);

        ctx.fill();
    }

    let prevTime = 0;
    const update = (t) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let dt = t - prevTime;

        if (dt < config.MAX_DT) {
            fireflies.forEach(f => {
                if (f.lifetime > f.max_lifetime) {
                    f.pos = randomScreenPos();
                    f.vel = randomVec2(-1, 1, -1, 1).scaleTo(config.MAX_SPEED);
                    f.lifetime = 0;
                }
                f.update(dt);
                drawFirefly(f);
            });
        }
        prevTime = t;
        requestAnimationFrame(update);
    }

    window.onload = () => {
        ctx = initCanvas("fireflies");
        fireflies = initFireflies(window.innerWidth, window.innerHeight);
        requestAnimationFrame(update);
    }
})();
