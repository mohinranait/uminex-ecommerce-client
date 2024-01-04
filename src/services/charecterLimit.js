export const charecterLimit = ( text , limit, dot) => {
    if(text?.length > limit){
        return `${text.slice(0,limit)}${dot ? '...':null}` ;
    }else{
        return text;
    }
}