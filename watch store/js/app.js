if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').then(reg=>{
        console.log("SW registered Successfully",reg)
    }).catch(err=>{
        console.log("SW Registration failed",err)
    })
}else{
    console.log("service workers not supported in this browser");
}