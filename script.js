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
    }

    delete(){

    }

    appendNumber(number){
        if(number=='.' && this.currentOperand.includes('.'))
            return;
        this.currentOperand=this.currentOperand.toString()+number;
    }

    chooseOperand(operand){
        this.operand=operand;
        this.previousOperand=this.currentOperand;
        this.currentOperand='';
    }

    update(){
        this.currentTextElement.innerText=this.currentOperand;
        this.previousTextElement.innerText=this.previousOperand;
    }
}

const ac=document.querySelector('.allclear');
const clear=document.querySelector('.clear');
const digits=document.querySelectorAll('.digit');
const operators=document.querySelectorAll('.op');
const previousTextElement=document.querySelector('.previous');
const currentTextElement=document.querySelector('.current');


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
})