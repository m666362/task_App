const add = (a,b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(a+b);
        }, 2000)
    })
}

const doWork =  async ()=>{
    var sum = await add(5,3);
    sum = await add(sum, 4);
    sum = await add(sum, 8);
    return sum;
}

add(5,3).then((result)=>{
    return add(result, 4);
}).then((result)=>{
    return add(result, 8);
}).then((result)=>{
    console.log("Promise Chaining Method: ", result)
}).catch((error)=>{
    console.log(error)
})

doWork().then((result)=>{
    console.log("Async method: ",result)
}).catch((error)=>{
    console.log(error)
})