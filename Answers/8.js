/* ************************************************************ */
/* 8. Что такое прототип и что значит прототипное наследование? */
/* ************************************************************ */

// Прототип это рабочий образец некоторого объекта, в отличие от Класса —
// который представляет из себя некий шаблон, чертёж, по которому собираются образцы
// объектов.
// Прототипное наследование, это единственный тип наследования, который существует в js
// при прототипном наследовании каждый объект связан с некоторым другим
// объектом(прототипом), таким образом, что все свойства объекта прототипа доступны через
// его дочерний объект. Если наследник имеет такое же свойство как и прототип,
// то обращения к свойству прототипа не происходит, это называется property shadowing.

// В JS реализована прототипная модель наследования, что означает что в JS не 
// существует классов, и даже новые зарезервированные слова из ES6 только 
// эмулируют функциональность системы классов, поверх прототипной системы.
// Т.е. слова class, constructor, static, extends, super - просто синтаксический сахарок.
// У каждого объекта в js есть свойство .__proto__ в который записана ссылка на объект-прототип.


// 1. Простой способ наследования может выглядить так: создать два объекта (ОbjectProto, objectInstance),
// и записав в свойство .__proto__ второго ссылку на первый:
let ОbjectProto = { title: 'simple object' };
let objectInstance = {};
objectInstance.__prototype__ = ObjectProto;
objectInstance.title;  // --> 'simple object'


// 2. Но этот способ не очень хороший, потому что в IE10- не работает, и обращение к .__системным__ свойствам не считается
// хорошей практикой. Поэтому есть альтернативный способ - использовать метод Object.create(ОbjectProto) которое вернёт
// объект, с свойством .__prototype__ привязанным к ОbjectProto:
let objectInstance2 = Object.create(ParentObject);  // аналогично предыдущему варианту, но короче



// 3. Классический вариант создания объектов "класса" в прототипной системе JS, с использованием ключевого слова 'new': 
// - вы описываете функцию "конструктор", по негласному соглашению их именуют с Большой буквы: Someconstructor
// - описываете объект-прототип функции конструктора: Someconstructor.prototype
// - вызываете функцию "конструктор" с ключевым словом new, в результате чего:
//   - создаётся новый чистый объект
//   - свойство .__proto__ этого объекта нацеливается на свойство .prototype функции "конструктора"
//     (так и создаётся цепочка прототипов)
//   - функция "конструктор" вызывается в контексте этого нового объекта, в результате чего
//     ключевое слово this внутри этой функции ссылается на этот новый объект

function Player(params) {  // объявляем функцию "конструктор" родительского "класса"
    this.name = params.name;
    this.ip = params.ip;
    this.server = false;

    // this.getId = this.getId.bind(this);  // так можно привязать this метода прототипа к создаваемому экземпляру
    this.id = this.getId();
}

Player.prototype.getId = function () {  // объявляем метод в объекте прототипе родительского "класса"
    if (!Player.prototype.playersCount) Player.prototype.playersCount = 0;  // счётчик игроков хранится в свойстве прототипа Player.prototype
    return Player.prototype.playersCount++;
}

Player.prototype.connect = function (ip) {  // объявляем метод в объекте прототипе родительского "класса"
    console.log(this.name + ' connecting to ip address: ' + ip);
}

Player.prototype.startServer = function () {  // объявляем метод в объекте прототипе родительского "класса"
    this.server = true;
    console.log(this.name + ' started server on ip ' + this.ip);
}

Player.prototype.stopServer = function () {  // объявляем метод в объекте прототипе родительского "класса"
    this.server = false;
    console.log(this.name + ' stopped server on ip ' + this.ip);
}


// создаём экземпляры объектов "класса" Player — js выполняет следующие операции неявно:
// - создаёт новый объект,
// - привязывает свойство .__proto__ нового объекта к Player.prototype,
// - после чего вызываем функцию "конструктор" Player в контексте этого нового экземпляра объекта
//   (т.е. this внутри неё ссылается на этот объект) и в конце функции снова возвращает этот объект
let john = new Player({name: 'John', ip: '192.168.1.64'});
let eva = new Player({name: 'Eva', ip: '192.168.1.65'});

// в результате получится:
console.log(john.id);  // --> 0
console.log(eva.id);  // --> 1
console.log(Player.prototype.playersCount);  // --> 2
john.startServer();  // --> 'John started server on ip 192.168.1.64'
console.log(john.server);  // --> true
eva.connect('192.168.1.64');  // --> 'Eva connecting to ip address: 192.168.1.64'


// 4. Если нужно организовать прототипное наследование в JS (наследование между родительским и дочерним классами),
// то в классическом варианте (с использованием "new") это делается так:
// - создаём "конструктор" дочернего "класса"
// - внутри него вызываем "Конструктор" родительского класса в контектсе создаваемого экземпляра, и передав в него все параметры
// - после вызова родительского "Конструктора" можем описывать любые свойства и методы экземпляра в дочернем "конструкторе"
// - в свойство .prototype дочернего конструктора записываем чистый объект, со свойством .__proto__ ссылающимся на родительский прототип.
//   это можно реализовать используя Object.create(ParentConstructor.prototype)
// - после перезаписи свойства .prototype у дочернего конструктора - мы теряем ссылку на сам конструктор дочернего объекта, поэтому
//   нам нужно её восстановить, явно занаписав в ChildConstructor.prototype.constructor ссылку на ChildConstructor
// - всё готово, теперь мы можем добавлять методы дочернему прототипу, "перегружать" родительские методы, а если понадобится
//   вызов родительских методов внутри дочернего прототипа - то вызов SUPER делается через ParentConstructor.prototype.methodname.call(this, arg) 


function PlayerCharacter(params) {  // объявляем функцию "конструктор" дочернего "класса"
    Player.apply(this, arguments);  // вызываем функцию "конструктор" родительского "класса", передавая ей весь набор параметров (params) через свойство arguments

    // создаём какие-то дополнительные свойства для экземпляра PlayerCharacter
    this.characterName = params.characterName;
    this.character = (['knight', 'archer', 'mage'].indexOf(params.character) > -1) ? params.character : 'knight';
    switch (this.character) {
        case 'archer':
            this.strength = 5;
            this.agility = 10;
            this.mana = 2;
            break;
        case 'mage':
            this.strength = 2;
            this.agility = 5;
            this.mana = 10;
            break;
        case 'knight':
            this.character = 'knight';
            this.strength = 10;
            this.agility = 5;
            this.mana = 2;
    }
}

PlayerCharacter.prototype = Object.create(Player.prototype);  // устанавливаем цепочку наследования прототипов: playerCharacterInstance.__proto__ ---> PlayerCharacter.prototype ---> Player.prototype
PlayerCharacter.prototype.constructor = PlayerCharacter;  // в предыдущей строке мы сломали свойство PlayerCharacter.prototype.constructor сделав его равным Player. Здесь — исправляем это.

PlayerCharacter.prototype.getId = function () {  // перегружаем метод родительского "класса" (method overriding)
    if (!PlayerCharacter.prototype.charactersCount) PlayerCharacter.prototype.charactersCount = 0;  // счётчик персонажей хранится в свойстве прототипа PlayerCharacter.prototype
    return PlayerCharacter.prototype.charactersCount++;
}

PlayerCharacter.prototype.connect = function (ip) {  // перегружаем метод (override)
    Player.prototype.connect.call(this, ip);  // аналог вызова метода super
    console.log('connecting with character ' + this.characterName + ' the ' + this.character);
}

PlayerCharacter.prototype.atack = function (enemyCharacter) {  // создаём метод дочернего "класса"
    console.log(this.characterName + ' is atacking ' + enemyCharacter.characterName + ' with ' + this.strength + ' hit points');
}


// создаём экземпляры объектов дочернего "класса" PlayerCharacter
let johnsArcher = new PlayerCharacter({name: 'John', characterName: 'Petra', character: 'archer', ip: '192.168.1.64'});
let evasKnight = new PlayerCharacter({name: 'Eva', characterName: 'Godric', ip: '192.168.1.65'});

// в результате получится:
console.log(johnsArcher.id);  // --> 0
console.log(evasKnight.id);  // --> 1
console.log(johnsArcher.name);  // --> 'John'
console.log(johnsArcher.ip);  // --> '192.168.1.64'
console.log(PlayerCharacter.prototype.charactersCount);  // --> 2
johnsArcher.startServer();  // --> 'John started server on ip 192.168.1.64'
console.log(johnsArcher.server);  // --> true
evasKnight.connect('192.168.1.64');  // --> 'Eva connecting to ip address: 192.168.1.64'  --> 'connecting with character Godric the knight'
evasKnight.atack(johnsArcher);  // --> 'Godric is atacking Petra with 10 hit points'



// 5. Создание объектов "класса" в функциональном стиле:
// - создаём объект прототип, задаём в нём какие-то общие методы для всех экземпляров
// - создаём в нём функцию которую будем использовать как "конструктор" экземпляров
// - задаём через неё уникальные свойства экземпляров класса
// - эта функция должна принимать необходимые для создания экземпляра параметры и возвращать наш объект
// - создаём экземпляры объекта используя Object.create(ProtoObject) и Object.create(ProtoObject).constructor()

var PlayerProto = {
    constructor: function (params) {  // объявляем функцию "конструктор"
        this.name = params.name;
        this.ip = params.ip;
        this.server = false;

        this.getId = this.getId.bind(this.__proto__);  // так можно привязать this метода прототипа к прототипу создаваемого экземпляра (ie10+)
        this.id = this.getId();
        return this;  // возвращаем наш объект из функции "конструктора"
    },
    getId: function () {  // объявляем метод прототипа
        if (!this.playersCount) this.playersCount = 0;  // счётчик игроков хранится в свойстве прототипа PlayerProto
        return this.playersCount++;
    },
    connect: function (ip) {  // объявляем метод прототипа
        console.log(this.name + ' connecting to ip address: ' + ip);
    },
    startServer: function () {  // объявляем метод прототипа
        this.server = true;
        console.log(this.name + ' started server on ip ' + this.ip);
    },
    stopServer: function () {  // объявляем метод прототипа
        this.server = false;
        console.log(this.name + ' stopped server on ip ' + this.ip);
    }
};

// создаём экземпляры объектов с прототипом PlayerProto 
let mark = Object.create(PlayerProto).constructor({name: 'Mark', ip: '192.168.1.66'});
let talissa = Object.create(PlayerProto).constructor({name: 'Talissa', ip: '192.168.1.67'});

// в результате получится:
console.log(mark.id);  // --> 0
console.log(talissa.id);  // --> 1
console.log(PlayerProto.playersCount);  // --> 2
mark.startServer();  // --> 'Mark started server on ip 192.168.1.66'
console.log(mark.server);  // --> true
talissa.connect('192.168.1.66');  // --> 'Talissa connecting to ip address: 192.168.1.66'


// 6. Прототипное наследование классов в JS в функциональном стиле:
// - создаём новый объект-прототип, от которого будут наследовать экземпляры дочернего "класса" через Object.create(ParentProto)
// - переопределяем метод .constructor дочернего прототипа, в начале его вызываем метод родительского прототипа в контексте
//   экземпляра, и перебрасываем в него все параметры
// - внутри этого же метода доопределяем нужные свойства и методы, уникальные для каждого экземпляра дочернего "класса"
// - доопределяем общие методы экземпляров "класса" на прототипе, если нужно - перегружаем родительские методы,
//   когда нужен вызов родительского метода (super) - используем ParentProto.methodname.call() 

let CharacterProto = Object.create(PlayerProto);
CharacterProto.constructor = function (params) {  // объявляем функцию "конструктор" дочернего "класса"
    PlayerProto.constructor.apply(this, arguments);  // вызываем функцию "конструктор" родительского "класса", передавая ей весь набор параметров (params) через свойство arguments

    // создаём какие-то дополнительные свойства для экземпляра CharacterProto
    this.characterName = params.characterName;
    this.character = (['knight', 'archer', 'mage'].indexOf(params.character) > -1) ? params.character : 'knight';
    switch (this.character) {
        case 'archer':
            this.strength = 5;
            this.agility = 10;
            this.mana = 2;
            break;
        case 'mage':
            this.strength = 2;
            this.agility = 5;
            this.mana = 10;
            break;
        case 'knight':
            this.character = 'knight';
            this.strength = 10;
            this.agility = 5;
            this.mana = 2;
    }
    return this;  // возвращаем из конструктора наш объект
};
CharacterProto.getId = function () {  // перегружаем метод родительского прототипа (method overriding)
    if (!this.charactersCount) this.charactersCount = 0;  // счётчик персонажей хранится в свойстве прототипа CharacterProto
    return this.charactersCount++;
};
CharacterProto.connect = function (ip) {  // перегружаем метод (override)
    PlayerProto.connect.call(this, ip);  // аналог вызова super
    console.log('connecting with character ' + this.characterName + ' the ' + this.character);
};
CharacterProto.atack = function (enemyCharacter) {  // создаём метод дочернего "класса"
    console.log(this.characterName + ' is atacking ' + enemyCharacter.characterName + ' with ' + this.strength + ' hit points');
};


// создаём экземпляры объектов дочернего "класса" PlayerCharacter
let marksArcher = Object.create(CharacterProto).constructor({name: 'Mark', characterName: 'Beowulf', character: 'archer', ip: '192.168.1.66'});
let talissasKnight = Object.create(CharacterProto).constructor({name: 'Talissa', characterName: 'Valkyre', ip: '192.168.1.67'});

// в результате получится:
console.log(marksArcher.id);  // --> 0
console.log(talissasKnight.id);  // --> 1
console.log(marksArcher.name);  // --> 'Mark'
console.log(marksArcher.ip);  // --> '192.168.1.66'
console.log(CharacterProto.charactersCount);  // --> 2
marksArcher.startServer();  // --> 'Mark started server on ip 192.168.1.66'
console.log(marksArcher.server);  // --> true
talissasKnight.connect('192.168.1.66');  // --> 'Talissa connecting to ip address: 192.168.1.66'  --> 'connecting with character Valkyre the knight'
talissasKnight.atack(marksArcher);  // --> 'Valkyre is atacking Beowulf with 10 hit points'





// 7. Итого:
// - прототип хранит общие свойства и методы для всех объектов, которые от него наследуют
// - поиск свойств происходит по цепочке прототипов через свойство .__proto__, сначала ищутся в самом объекте, затем в его
//   прототипе, затем в прототипе прототипа, и т.д.
// - конструктор вызывается в контексте каждого конкретного экземпляра "класса", и доопределяет его свойства и методы
// - методы прототипа теряют this при использовании в другом контексте, например в коллбэках обработчиков событий
// - можно использовать this.method = this.method.bind(this) в функции "конструкторе", чтобы привязать this метода прототипа
//   к конкретному экземпляру объекта. Но при таком подходе для каждого экземпляра всё равно создаётся дополнительное свойство,
//   а это занимает память.
// - "Класс" в js — это множество объектов, которые наследуют свои свойства от одного прототипа