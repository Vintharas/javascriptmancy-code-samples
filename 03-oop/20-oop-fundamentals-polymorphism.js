/* 
 *
 * JavaScript-mancy 
 * OOP Fundamentals: Polymorphism
 *
 *
 */


// Polymorphism in C#
/*

// a skeleton
public class Skeleton{
	public int Health {get;set;}
	private Position position;
	
	public Skeleton(){
		Health = 50;
		position = new Position();
	}

	public void MovesTo(int x, int y){
		position.X = x;
		position.Y = y;
	}
}

// we define an Attacks method
// so it can be useful in our army:

public class Skeleton{
	public int Health {get;set;}
	private int damage;
	private Position position;
	
	public Skeleton(){
		Health = 50;
		damage = 10;
		position = new Position();
	}
	
	public void MovesTo(int x, int y){
		position.X = x;
		position.Y = y;
	}

    public void Attacks(Skeleton enemySkeleton){
        enemySkeleton.Health -= damage;
    }
}


Ok, now you have a skeleton that can attack other skeletons! Yippi! Let's image that your most bitter enemy has a vast army of goblins:

public class Goblin{
    public int Hp {get;set;}
    
	public void MovesTo(int x, int y){
		position.X = x;
		position.Y = y;
	}
}


A `Goblin` is not a `Skeleton` and therefore your skeletons are going to have a hard time beating that army as of right now. You decide to teach them how to beat goblins up:

    public void Attacks(Skeleton enemySkeleton){
        enemySkeleton.Health -= damage;
    }

    public void Attacks(Goblin goblin){
        goblin.Health -= damage;
    }


And then find out that not only has he goblins, but also orcs, trolls, wargs and wyrms. 


    public void Attacks(Skeleton enemySkeleton){
        enemySkeleton.Health -= damage;
    }

    public void Attacks(Goblin goblin){
        goblin.Health -= damage;
    }

    public void Attacks(Orc orc){
        orc.Health -= damage;
    }

    public void Attacks(Troll troll){
        troll.Health -= damage;
    }

    public void Attacks(Warg warg){
        warg.Health -= damage;
    }

    public void Attacks(Wyrm wyrm){
        wyrm.Health -= damage;
    }

And this got out of hand reaaaally fast. This is one scenario in which *polymorphism* could come in handy. We can take advantage of *polymorphism* by defining a common base class for all these creatures that would encapsulate the needed contract for *being attached* which is the `Health` property:

public class Monster{
   public int Health {get;set;}
}
public class Skeleton : Monster {}
public class Goblin : Monster {}
public class Orc : Monster {}
public class Troll: Monster {}
// etc


and redefining the `Attacks` method in term of that new type:


    public void Attacks(Monster monster){
        monster.Health -= damage;
    }

Of course we would also like our minions to be able to attack defensive structures like towers, or walls, or fences which are most definitely not monsters. In which case it would perhaps be more appropriate to use an interface instead to represent that contract of something being attacked:


public interface IAttackable {
   int Health {get;set;}
}
public class Monster : IAttackable{
   public int Health {get;set;}
}
public class Skeleton : Monster {}
public class Goblin : Monster {}
// etc
public class Tower: IAttackable {}
public class Fence: IAttackable {}
// etc


Again we redefine the `Attacks` method to be even more abstract and applicable to any type that implements the `IAttackable` interface be it a creature, a defensive structure, or a sandwich:


    public void Attacks(IAttackable target){
        target.Health -= damage;
    }



*/


// Polymorphism in JavaScript
console.log("======= Polymorphism in JavaScript ========")

// in JavaScript we use duck typing
// the semantics of an object are defined by its interface
// its methods and properties
// and not by its type 
let skeleton = {
    health: 50,
    damage: 10,
    position: {x: 0, y: 0},
    toString() { 
      return 'Skeleton';
    },
    movesTo(x, y){
        this.position.x = x;
        this.position.y = y;
    },
    attacks(monster){
        monster.health -= this.damage;
        console.log(`${this} attacks ${monster} fiercely!`);
    }
}

// the attack method only requires that the `monster` object
// has a health property
// it doesn't care about the type of the object
let orc = { name: 'orc', health: 100, toString(){return this.name;}};
let goblin = {health: 10, toString(){return 'goblin';}};
let tower = {health: 1000, toString(){ return 'fortified tower';}};

skeleton.attacks(orc);
// => Skeleton attacks orc fiercely!
skeleton.attacks(goblin);
// => Skeleton attacks goblin fiercely!
skeleton.attacks(tower);
// => Skeleton attacks fortified tower fiercely!

console.log('==== and pushing it a little bit further ======')

skeleton.attacks.health = 50;
skeleton.attacks(skeleton.attacks);
// => Skeleton attacks function attacks(monster) { ...
// OMG that was so meta
console.log(skeleton.attacks.health);
// => 40








