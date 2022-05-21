// Learing OOP in JavaScript

function createCircle (radius) {
    return {
        radius,
        draw: function () {
            console.log('draw');
        }
    };
}

const circle = createCircle(1);
circle.draw();

function Circle(radius) {
    console.log('this', this);
    this.radius = radius;
    this.draw = function () {
        console.log('draw');
    }
}

const another = new Circle(1);

easyJQ.animate("h1", { height: 1000 }, 0);

