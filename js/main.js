var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var cam = new Vector(0, 0, 0);

var world = [];
world[0] = new Sphere(new Vector(0, 0, 5), 1, '#458721');
world[1] = new Sphere(new Vector(1, 1, 10), 2, '#FF5456');

var screen = { 
  width: 500, 
  height: 500, 
  fov: 100
};

var camToWorld;
(function() { 
  var ratio = screen.height / screen.width; 
  
  var width = Math.tan((screen.fov / 2) * Math.PI / 180); 
  var height = width / ratio; 
  
  var stepX = width / screen.width; 
  var stepY = height / screen.height; 
  
  camToWorld = []; 
    for (var x = -screen.width / 2; x < screen.width / 2; x++) {  
      camToWorld[x + screen.width / 2] = [];  
      for (var y = screen.height / 2; y > -screen.height / 2; y--) {  
        var posX = stepX * x + stepX / 2;   
        var posY = stepY * y + stepY / 2;   
      camToWorld[x + screen.width / 2][y + screen.height / 2 - 1] = new Vector(posX, posY, 1).normalized(); 
      } 
    } 
  console.log("Starting trace"); 
  for (var x = 0; x < screen.width; x++)  
    for (var y = 0; y < screen.height; y++) {   
      for (var i = 0; i < world.length; i++)   
        if (world[i].intersects(new Ray(new Vector(0, 0, 0), camToWorld[x][y]))) {    
          ctx.fillStyle = world[i].color;    
          ctx.fillRect(x, y, 1, 1);   
        }  }
}
)();

function Vector(x, y, z) { 
  this.x = x; 
  this.y = y; 
  this.z = z; 
  
  this.add = function(vec) {  
    return new Vector(this.x + vec.x,this.y + vec.y, this.z + vec.z); 
  }; 
  
  this.sub = function(vec) {  
    return new Vector(this.x - vec.x, this.y - vec.y, this.z - vec.z); 
  }; 
  
  this.mult = function(vec) {  
    if (typeof vec == "number")   
        return new Vector(this.x * vec, this.y * vec, this.z * vec);  
      else   
        return new Vector(this.x * vec.x, this.y * vec.y, this.z * vec.z); 
  }; 
  
  this.div = function(vec) {  
    return new Vector(this.x / vec.x, this.y / vec.y, this.z / vec.z); 
  }; 
  
  this.dot = function(vec) {  
    return this.x * vec.x + this.y * vec.y + this.z * vec.z; 
  }; 
  
  this.length = function() {  
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2); 
  }; 
  
  this.normalized = function() {  
    var len = this.length();  
    return new Vector(this.x / len, this.y / len, this.z / len); 
  }; 
  this.normal = function() { 
  };
}

function Ray(origin, direction) {
  this.origin = origin; 
  this.direction = direction; 
  
  this.length = function() {  
    return this.direction.sub(this.origin).length(); 
  }
}

function Sphere(center, radius, color) { 
  this.center = center; 
  this.radius = radius; 
  this.color = color; 
  
  this.intersects = function(ray) {  
    var b = this.center.sub(ray.origin);  
    var t = ray.direction.dot(b);  
    var p = ray.origin.add(ray.direction.mult(t));  
    var d = this.center.sub(p);  
    if (d.length() <= this.radius)  {   
      return true;   
      console.log(ray.direction);  
    }  
    return false
  };
};
