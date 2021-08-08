const form = document.querySelector("#search");
const shows = document.querySelector("#shows");

const generateImg = (imgarr) => {
    var i = 0;
    for (data of imgarr) {
        if (data.show.image) {
            const divMain = document.createElement("div");
            divMain.classList.add("card");
            document.getElementById("tv").appendChild(divMain);

            var imag = document.createElement("IMG");
            imag.classList.add("img");
            imag.src = `${data.show.image.medium}`;
            document.getElementsByClassName("card")[i].appendChild(imag);

            const divBody = document.createElement("div");
            divBody.classList.add("card-body");
            document.getElementsByClassName("card")[i].append(divBody);

            var h5 = document.createElement("h5");
            h5.classList.add("card-title");
            h5.innerText = `${data.show.name}`;
            var h6 = document.createElement("h6");
            h6.innerHTML = `<b>Rating: </b>${data.show.rating.average}`;
            var h62 = document.createElement("h6");
            h62.innerHTML = `<b>Premiered: </b>${data.show.premiered}`;

            var p = document.createElement("p");
            p.classList.add("card-text");
            p.classList.add(`${i}`);
            p.innerHTML = `${data.show.summary}`;
            document.getElementsByClassName("card-body")[i].append(h5);
            document.getElementsByClassName("card-body")[i].append(h6);
            document.getElementsByClassName("card-body")[i].append(h62);
            document.getElementsByClassName("card-body")[i].append(p);

            i++;
        }
    }
    addHover();
}

form.addEventListener("submit", async function(e) {
    e.preventDefault();
    removeImg();
    const searchTerm = form.elements.query.value;
    try {
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
        console.log(res.data);
        if (!res.size()) {
            const h4 = document.createElement("h4");
            h4.innerText = "Opps! No movies found";
            h4.style.alignItems = "flex-center";
            h4.style.color = "white";
            document.getElementById("tv").appendChild(h4);
        }
        generateImg(res.data);
        form.elements.query.value = "";
    } catch (error) {
        // console.log("No movies found");
        const h4 = document.createElement("h4");
        h4.innerText = "Opps! No movies found";
        h4.style.alignItems = "flex-center";
        h4.style.color = "white";
        document.getElementById("tv").appendChild(h4);
    }

})

function addHover() {
    const imagesAll = document.getElementsByClassName("card");
    for (let index = 0; index < imagesAll.length; index++) {
        const element = imagesAll[index];
        element.addEventListener("mouseover", function() {
            const p = document.getElementsByClassName("card-text")[index];
            p.style.display = "inline";
            const card = document.getElementsByClassName("card")[index]
                //card.style.backgroundColor = "rgba(237, 130, 204,1)";
            card.classList.add("card2");
        });
        element.addEventListener("mouseout", function() {
            document.getElementsByClassName("card-text")[index].style.display = "none";
            const card = document.getElementsByClassName("card")[index];
            //card.style.backgroundColor = "rgba(237, 130, 204,0.5)";
            card.classList.remove("card2");
        });
    }
}

const removeImg = () => {
    const card = document.getElementsByClassName("card");
    $(".card").remove();
}
