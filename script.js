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
        this.currentOperand=number;
    }

    update(){
        this.currentTextElement.innerText=this.currentOperand;
    }
}

const ac=document.querySelector('.allclear');
const clear=document.querySelector('.clear');
const digits=document.querySelectorAll('.digit');
const operators=document.querySelectorAll('.op');
const previousTextElement=document.querySelector('.previous');
const currentTextElement=document.querySelector('.current');


const calculator=new Calculator(previousTextElement,currentTextElement);

digits.forEach(digit=>{
    digit.addEventListener('click',()=>{
        calculator.appendNumber(digit.innerText);
        calculator.update();
    })
});