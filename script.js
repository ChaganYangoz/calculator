class Calculator{
    constructor(previousTextElement,currentTextElement){
        this.previousTextElement=previousTextElement;
        this.currentTextElement=currentTextElement;
        this.clearAll();
    }

    clearAll(){
        this.currentOperand='';
        this.previousOperand='';
        this.operand=undefined;
        this.update();
    }

    delete(){
        if(this.currentOperand!=''){
            this.currentOperand=this.currentOperand.substring(0,this.currentOperand.length-1);
            this.update();
        }
        else if(this.operand!=undefined){
            this.operand=undefined;
            if(this.currentOperand==''){
                this.currentOperand=this.previousOperand;
                this.previousOperand='';
            }
            this.update();
        }
    }

    appendNumber(number){
        if(number=='.' && this.currentOperand.includes('.'))
            return;
        this.currentOperand=this.currentOperand.toString()+number;
    }

    chooseOperand(operand){
        if(this.operand!=undefined && this.previousOperand!="" && this.currentOperand!=''){
            this.compute();
            this.previousOperand=this.currentOperand;
        }
        if(this.operand!=undefined){
            return;
        }
        if(this.previousOperand==''){
            this.previousOperand=this.currentOperand;
        }
        this.operand=operand;
        this.currentOperand='';
    }

    update(){
        this.currentTextElement.innerText=this.currentOperand;
        if(this.operand==undefined || this.previousOperand==''){
            this.previousTextElement.innerText=this.previousOperand;
        }
        else{
            this.previousTextElement.innerText=this.previousOperand+' '+this.operand;
        }
    }

    compute(){
        switch(this.operand){
            case '+':this.currentOperand=(parseFloat(this.currentOperand)+parseFloat(this.previousOperand)).toString();
            break;
            case '*':this.currentOperand=(parseFloat(this.currentOperand)*parseFloat(this.previousOperand)).toString();
            break;
            case '-':this.currentOperand=(parseFloat(this.previousOperand)-parseFloat(this.currentOperand)).toString();
            break;
            case '/':this.currentOperand=(parseFloat(this.previousOperand)/parseFloat(this.currentOperand)).toString();
            break;
            case '%':this.currentOperand=(parseFloat(this.previousOperand)%parseFloat(this.currentOperand)).toString();
        }
        this.currentOperand=Math.round(this.currentOperand * 100) / 100;
        this.previousOperand='';
        this.operand=undefined;
        this.update();
    }
}

const ac=document.querySelector('.allclear');
const clear=document.querySelector('.clear');
const digits=document.querySelectorAll('.digit');
const operators=document.querySelectorAll('.op');
const previousTextElement=document.querySelector('.previous');
const currentTextElement=document.querySelector('.current');
const equal=document.querySelector('#equal');


const calculator=new Calculator(previousTextElement,currentTextElement);
calculator.clearAll();

digits.forEach(digit=>{
    digit.addEventListener('click',()=>{
        calculator.appendNumber(digit.innerText);
        calculator.update();
    })
});
operators.forEach(operator=>{
    operator.addEventListener('click',()=>{
        calculator.chooseOperand(operator.innerText);
        calculator.update();
    })
});

equal.addEventListener('click',()=>{
    calculator.compute();
    calculator.update();
});

ac.addEventListener('click',()=>{
    calculator.clearAll();
});

clear.addEventListener('click',()=>{
    calculator.delete();
})

document.addEventListener('keydown', (event) => {
    var name = event.key;
    let numberCheck=[0,1,2,3,4,5,6,7,8,9,'.'];
    let operatorCheck=['*','/','+','-'];

    for(let i=0;i<numberCheck.length;i++){
        if(numberCheck[i]==name){
            calculator.appendNumber(name);
            calculator.update();
        }
    }

    for(let i=0;i<operatorCheck.length;i++){
        if(operatorCheck[i]==name){
            calculator.chooseOperand(name);
            calculator.update();
        }
    }
    if(name=="Enter"){
        calculator.compute();
    }

    if(name=="Backspace"){
        calculator.delete();
    }
});