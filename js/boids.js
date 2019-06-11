(function() {
    const config = {
        MAX_SPEED: 0.1,
        LENGTH: 8,
        SEPARATION: 0.05,
        ALIGNMENT: 0.1,
        COHESION: 1,
        NEIGHBORHOOD: 70
    };

    let ctx = null, boids = [];

    const mod = (x, n) => (x % n + n) % n;

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

    function Boid(i, w, h) {
        this.id = i;
        this.pos = new Vec2(Math.random() * w,
                            Math.random() * h);

        this.vel = new Vec2((Math.random() - 0.5),
                            (Math.random() - 0.5)).scaleTo(config.MAX_SPEED);
    }

    Boid.prototype.update = function(dt) {
        this.pos.x = mod(this.pos.x + this.vel.x * dt, ctx.canvas.width);
        this.pos.y = mod(this.pos.y + this.vel.y * dt, ctx.canvas.height);
    }

    Boid.prototype.neighborhood = function(d) {
        return boids.filter(function(b) {
            return b.id != this.id && b.pos.distanceTo(this.pos) < d;
        }.bind(this));
    }

    const fitCanvasToWindow = canvas => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    const initCanvas = canvasId => {
        let canvas = document.getElementById(canvasId)
        fitCanvasToWindow(canvas);
        window.addEventListener("resize", () => fitCanvasToWindow(canvas));

        return canvas.getContext("2d");
    }

    const initBoids = n => {
        let boids = [];

        for (let i = 0; i < n; i++) {
            boids[i] = new Boid(i, window.innerWidth, window.innerHeight);
        }

        return boids;
    }

    const drawBoid = b => {
        ctx.beginPath();

        let e = b.vel.scaleTo(config.LENGTH);

        ctx.strokeStyle = "#444";
        ctx.moveTo(b.pos.x, b.pos.y);
        ctx.lineTo(b.pos.x + e.x, b.pos.y + e.y);

        ctx.closePath();
        ctx.stroke();
    }

    const avgVecs = vecs => vecs.reduce((a, c) => a.add(c), new Vec2(0, 0)).div(vecs.length);

    let prevTime = 0;
    const update = (t) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        boids.forEach(b => {
            let nhood = b.neighborhood(config.NEIGHBORHOOD);
            if (nhood.length > 0) {
                let avgVel = avgVecs(nhood.map(b => b.vel)),
                    avgPos = avgVecs(nhood.map(b => b.pos));

                /* Alignment */
                b.vel.add(avgVel.scaleTo(config.ALIGNMENT).div(b.pos.distanceTo(avgPos)));

                /* Separation */
                b.vel.add(avgPos.to(b.pos).scaleTo(config.SEPARATION).div(b.pos.distanceTo(avgPos)));
            }

            b.vel.clampAt(config.MAX_SPEED);
            b.update(t - prevTime);
            drawBoid(b);
        });

        prevTime = t;
        requestAnimationFrame(update);
    }

    window.onload = () => {
        ctx = initCanvas("boids");
        boids = initBoids(50);
        requestAnimationFrame(update);
    }
})();
