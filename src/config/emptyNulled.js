const emptyNulled = (form)=>{
    Object.keys(form).forEach((key, idx) =>{
        if(form[key] == "")
        {
            form[key] = null;
        }
        console.log(form[key])
    })
}

export default emptyNulled