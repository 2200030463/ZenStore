async function run() {
    const res = await fetch('https://dummyjson.com/products/categories');
    const data = await res.json();
    console.log(data);
}
run();
