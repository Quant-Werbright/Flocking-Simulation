class Boid{
  constructor(x,y){
    this.position = createVector(x,y);
    this.velocity = p5.Vector.random2D();
    this.acc = createVector();
  //  this.velocity.setMag(random(1,4));
    this.maxSpeed = 5;
    this.maxForce = 0.6;
    this.group = [];
    this.checkGroup();

  }
  align(boidsss) {
    //this.maxSpeed = speedSlider.value();
    let avg = createVector();
    let total = 0;
    let steer = createVector();
    let avoid = createVector();
    for (let boids of boidsss){
    for (let other of boids){
    let d = dist(
      this.position.x,
      this.position.y,
      other.position.x,
      other.position.y,
    );
      if (other != this && d < sight){
        //alignment
        avg.add(other.velocity)
        //cohesion
        steer.add(other.position);
        //seperation
        let diff = p5.Vector.sub(this.position,other.position);
        diff.div(d);
        avoid.add(diff);
        total += 1;
      }

    }
    if (total > 0){
      //alignment
      avg.div(total);
      avg.setMag(this.maxSpeed);
      avg.sub(this.velocity);
      avg.limit(this.maxForce);
      //cohesion
      steer.div(total);
      steer.sub(this.position);
      steer.setMag(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
      //seperation
      //mouse
      for (let ob of obstaclesGroup){
        var desired = p5.Vector.sub(ob,this.position);
        if (desired.mag() < 100){
          desired.mult(-1);
          //desired.div(desired.mag()*1.5)
          avoid.add(desired);
        }
      }


      //others
      avoid.div(total);

      avoid.setMag(this.maxSpeed);
      avoid.sub(this.velocity);
      avoid.limit(this.maxForce);
    }
  }
    return [avg,steer,avoid];
  }
  checkGroup(){
    if (this.position.x < (width/2)+sight && this.position.y < (height/2)+sight){
      group1.push(this);
      this.group.push(group1);
    }
    if (this.position.x > (width/2)-sight && this.position.y < (height/2)+sight){
      group2.push(this);
      this.group.push(group2);
    }
    if (this.position.x < (width/2)+sight && this.position.y > (height/2)-sight){
      group3.push(this);
      this.group.push(group3);
    }
    if (this.position.x > (width/2)-sight && this.position.y > (height/2)-sight){
      group4.push(this);
      this.group.push(group4);
    }

  }
  check(){
    if (this.position.x > width){
      this.position.x = 0;
    }
    if (this.position.x < 0){
      this.position.x = width;
    }
    if (this.position.y < 0){
      this.position.y = height;
    }
    if (this.position.y > height){
      this.position.y = 0;
    }

  }
  flock(){
    this.acc = createVector();

    let steer = this.align(this.group);


    let alignment = steer[0];
    let cohesion = steer[1];
    let seperation = steer[2];
    seperation.mult(seperationSlider.value());
    alignment.mult(alignmentSlider.value());
    cohesion.mult(cohesionSlider.value());
    this.acc.add(cohesion);
    this.acc.add(seperation);
    this.acc.add(alignment);
    //this.acc = cohesion.add(seperation.add(alignment));//steer[0].add(steer[1].add(steer[2]));
  }
  update(){
    this.group = [];
    this.checkGroup();
  //  this.flock();
    this.check();
    //
    //this.align();
    this.acc.setMag(2);
    this.position.add(this.velocity);
    this.velocity.add(this.acc);
  }
  show(){
    strokeWeight(2);
    stroke(255);

    fill(40)
    //translate(0,0);
    //translate(this.position.x,this.position.y+10);
    // /var angle = createVector(1,0).angleBetween(this.velocity);
    //r//otate(angle);
  //  triangle(this.position.x,this.position.y,this.position.x+this.velcocity.x,this.position.y + this.velocity.y,this.position.x-vel,this.position.y + 10);

  // ellipse(this.position.x,this.position.y,10,10);
    line(this.position.x,this.position.y,this.position.x+this.velocity.x*4,this.position.y+this.velocity.y*4)
  }
}
