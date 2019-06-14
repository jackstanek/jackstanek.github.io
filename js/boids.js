(function() {
    const config = {
        MAX_DT: 100,
        MAX_SPEED: 0.1,
        LENGTH: 8,
        SEPARATION: 0.015,
        ALIGNMENT: 0.7,
        COHESION: 0.01,
        NEIGHBORHOOD: 50,
        SWARM_FACTOR: 0.000001,
        SWARM_BASE: 1.00001,
        DENSITY: 0.0004
    };

    let ctx = null, boids = [];
    let radius = Math.min(window.innerWidth, window.innerHeight) / 2;

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
    let swarmCenter = screenCenter.copy();
    let timeUntilCenterChange = 5000 * Math.random() + 1000;

    function Boid(i, w, h) {
        this.id = i;
        this.pos = new Vec2(Math.random() * w,
                            Math.random() * h);

        this.vel = new Vec2((Math.random() - 0.5),
                            (Math.random() - 0.5)).scaleTo(config.MAX_SPEED);

        this.max_speed = config.MAX_SPEED * Math.random() + 0.1
    }

    Boid.prototype.update = function(dt) {
        this.pos.x = this.pos.x + this.vel.x * dt;
        this.pos.y = this.pos.y + this.vel.y * dt;
    }

    Boid.prototype.neighborhood = function(d) {
        return boids.filter(function(b) {
            return b.id != this.id && b.pos.distanceTo(this.pos) < d;
        }.bind(this));
    }

    const fitCanvasToWindow = canvas => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        screenCenter.set(innerWidth / 2, innerHeight / 2);
        radius = Math.min(window.innerWidth, window.innerHeight) / 2;
    }

    const initCanvas = canvasId => {
        let canvas = document.getElementById(canvasId)
        fitCanvasToWindow(canvas);
        window.addEventListener("resize", () => fitCanvasToWindow(canvas));

        return canvas.getContext("2d");
    }

    const initBoids = (w, h) => {
        let boids = [];

        for (let i = 0; i < w * h * config.DENSITY; i++) {
            boids.push(new Boid(i, w, h));
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
        let dt = t - prevTime;

        timeUntilCenterChange -= dt;
        if (timeUntilCenterChange <= 0) {
            let pt = {
                r: Math.sqrt(Math.random()) * radius,
                theta: Math.random() * 2 * Math.PI
            }

            swarmCenter.set(pt.r * Math.cos(pt.theta) + window.innerWidth / 2,
                            pt.r * Math.sin(pt.theta) + window.innerHeight / 2)

            timeUntilCenterChange = 5000;
        }

        if (dt < config.MAX_DT) {
            boids.forEach(b => {
                let nhood = b.neighborhood(config.NEIGHBORHOOD);
                if (nhood.length > 0) {
                    let avgVel = avgVecs(nhood.map(b => b.vel)),
                        avgPos = avgVecs(nhood.map(b => b.pos));

                    /* Alignment */
                    b.vel.add(avgVel.scaleTo(config.ALIGNMENT).div(b.pos.distanceTo(avgPos)));

                    /* Separation */
                    b.vel.add(nhood.reduce((a, c) => {
                        let to = c.pos.to(b.pos);
                        return a.add(to.mul(0.1 / to.norm()))
                    }, new Vec2(0, 0)).scaleTo(config.SEPARATION));

                    /* Cohesion */
                    b.vel.add(b.pos.to(avgPos).scaleTo(config.COHESION));
                }

                b.vel.clampAt(b.max_speed);
                b.update(dt);
                drawBoid(b);
            });
        }
        prevTime = t;
        requestAnimationFrame(update);
    }

    window.onload = () => {
        ctx = initCanvas("boids");
        boids = initBoids(window.innerWidth, window.innerHeight);
        requestAnimationFrame(update);
    }
})();
