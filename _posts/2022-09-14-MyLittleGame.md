---
layout: post
---
A little game from rrmengru.space
For no experience new beginner to experient programming.

{% highlight ruby %}
        let width = 30
        let height = 18
        let mygame = new Game(width, height, 2)

        let human = mygame.create.human(1,1)
        human.style = pattern.human
        let wall = mygame.create.wall()

        //create walls around
        for (let i = 0; i <= 17; i++) {
            mygame.create.wall(0,i)
            mygame.create.wall(29,i)
        }
        for (let i = 0; i <= 29; i++) {
            mygame.create.wall(i,0)
            mygame.create.wall(i,17)
        }
        //create the walls inside
        for (let i = 11; i <= 28; i++) {
            mygame.create.wall(i,3)
        }
        for (let i = 1; i <= 9; i++) {
            mygame.create.wall(i,7)
        }
        for (let i = 3; i <= 5; i++) {
            mygame.create.wall(i,10)
        }
        for (let i = 1; i <= 2; i++) {
            mygame.create.wall(i,13)
        }
        for (let i = 26; i <= 28; i++) {
            mygame.create.wall(i,13)
        }
        for (let i = 11; i <= 16; i++) {
            mygame.create.wall(5,i)
        }

        //create air and stars
        //let air = mygame.create.air()
        
        let star1 = mygame.create.air(28, 4)
        star1.style = pattern.star

        let star2 = mygame.create.air(27, 14)
        star2.style = pattern.star

        let star3 = mygame.create.air(2, 14)
        star3.style = pattern.star

        //create fire
        let fire1 = mygame.create.wall(14, 3)
        
        fire1.style = pattern.fire
        
        
        //create bullets and set the game over condition
        setInterval(function() {
            let bullet = mygame.create.air(28, 1)
            bullet.style = pattern.bullet
            bullet.automove.left(29, 3)

            bullet.move.after = function() {
                if (human.isoverlapping(bullet)) {
                    mygame.over.lose()
                }
            }
            
        }, 1500)

        //create a gun
        let gun = mygame.create.wall(28, 1)
        gun.style = pattern.gun

        //create a turtle
        let turtle = mygame.create.air(26,4)
        turtle.style = pattern.turtle
        turtle.automove.left(9, 1, true)

        //create a stone human can ride
        let stone = mygame.create.wall(9, 13)
        stone.automove.right(6, 1, true)

        //let state = false
        stone.move.after = function() {
            if (state) {
                human.x = stone.x
                human.y = stone.y + 1
            }
        }

        //game conditons
        human.move.after = function() {
            if (human.istouched(fire1)) {
                mygame.over.lose()
            }
            if (human.isoverlapping(turtle)) {
                mygame.over.lose()
            }
            if (human.isoverlapping(star1)) {
            human.strength += 1
            star1.remove()
            }
            if (human.isoverlapping(star2)) {
            human.strength += 1
            star2.remove()
            }
            if (human.isoverlapping(star3)) {
            human.strength += 1
            star3.remove()
            }
            if (human.istouched(stone)) {
                state = true 
            }
                else {
                    state = false
                }
            
        }
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
