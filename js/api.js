const loadMenu = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    // console.log(data.data)
    displayMenu(data.data);
}
function displayMenu(data)
{
    const menu = document.getElementById('menu-items')
for(let i=0; i<data.length; i++)
{
    const menuListName = data[i].category;
    const menuListId = data[i].category_id;
    const button = document.createElement('button');
    button.innerHTML = `
    <a id="${menuListId}" >${menuListName}</a>
    `
    button.classList.add('btn','text-black','rounded-md','bg-[#25252526]',);
    menu.appendChild(button);
    // console.log(button)
}
}
const loadContent = async ()=>{
    const response = await fetch (`https://openapi.programming-hero.com/api/videos/category/${1000}`)
    const dataContainer = await response.json();
    console.log(dataContainer.data);
    showCard(dataContainer.data);
}

function showCard(card)
{
    card.forEach(card => {
        console.log(card.thumbnail)
        const dataContainerCard = document.getElementById('card-container');
    // console.log(card)
    const div = document.createElement('div');
    div.classList.add('card','card-compact','width-auto','rounded-lg','bg-[#25252526]','shadow-xl');
    div.innerHTML = `
    <figure><img class="h-[200px] w-full" src="${card.thumbnail}" alt="Shoes" /></figure>
    <div class="card-body p-2">
            <div class="flex items-center gap-3">
            <img class="w-10 h-10 rounded-full" src="${card.authors[0].profile_picture}"alt="" />
            <h2 class="text-[16px] font-bold">${card.title}</h2>
            </div>
            <p>${card.authors[0].profile_name}</p>
            <div class="card-actions justify-end">
    </div>


    `
    dataContainerCard.appendChild(div);
    // console.log(dataContainerCard.innerHTML)
    });


    
}

loadContent();

loadMenu();
