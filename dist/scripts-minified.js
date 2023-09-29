let pokemonRepository = (() => {
    let e = [],
        t = "https://pokeapi.co/api/v2/pokemon/?limit=200";
    function n(t) {
        "object" == typeof t && "name" in t
            ? e.push(t)
            : alert("Invalid input. Please provide a valid Pok\xe9mon object.");
    }
    function i(t) {
        e.filter((e) => e.name === t);
    }
    function a(e, t) {
        e.addEventListener("click", function () {
            s(t);
        });
    }
    function o(e) {
        let t = document.getElementById("pokemon-list"),
            n = `${e.name.charAt(0).toUpperCase()}${e.name.slice(1)}`,
            i = document.createElement("li"),
            a = document.createElement("button"),
            o = document.createElement("p");
        i.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "container",
            "circle"
        ),
            a.classList.add(
                "hover-overlay",
                "btn",
                "btn-link",
                "dark-blue",
                "openModalButton",
                "font-weight-bold",
                "letter-spacing-sm"
            ),
            i.classList.add("list-group"),
            fetch(e.detailsUrl)
                .then(function (e) {
                    return e.json();
                })
                .then(function (e) {
                    (o.innerText = `Race: ${e.species.name
                        .charAt(0)
                        .toUpperCase()}${e.species.name.slice(1)}`),
                        o.classList.add("font-weight-bold"),
                        i.appendChild(o);
                }),
            (a.innerText = n),
            i.appendChild(a),
            t.appendChild(i),
            a.addEventListener("click", function () {
                s(e);
            });
    }
    function s(e) {
        c(e).then(function () {
            let t = e.height,
                n = e.type.map((e) => e.type.name).join(", "),
                i = e.abilities.map((e) => e.ability.name).join(", "),
                a = e.img,
                o = `Image of ${e.name}`,
                s = document.getElementById("modal-Container");
            s.classList.add("modal", "fade"),
                s.setAttribute("aria-labelledby", "pokemonModalLabel"),
                s.setAttribute("aria-hidden", "true");
            let d = document.createElement("div"),
                r = document.createElement("div"),
                c = document.createElement("div"),
                p = document.createElement("div"),
                m = document.createElement("div");
            d.classList.add("modal-dialog"),
                r.classList.add("modal-content"),
                c.classList.add("modal-header"),
                p.classList.add("modal-body"),
                m.classList.add("modal-footer");
            let u = document.createElement("h2");
            u.classList.add("modal-title"), (u.innerText = "Pok\xe9mon Details");
            let h = document.createElement("button");
            h.classList.add("close"),
                h.setAttribute("type", "button"),
                h.setAttribute("data-dismiss", "modal"),
                (h.innerHTML = '<span aria-hidden="true">&times;</span>'),
                c.appendChild(u),
                c.appendChild(h);
            let f = document.createElement("p");
            (f.innerHTML = `<strong>Height:</strong> <span>${t}</span>`),
                f.classList.add("pokemon-height");
            let b = document.createElement("p");
            (b.innerHTML = `<strong>Type:</strong> <span>${n}</span>`),
                b.classList.add("pokemon-type");
            let g = document.createElement("p");
            (g.innerHTML = `<strong>Abilities:</strong> <span>${i}</span>`),
                g.classList.add("pokemon-abilities");
            let L = document.createElement("img");
            (L.src = a), (L.alt = o), L.classList.add("img-fluid", "custom-image-size");
            let E = document.createElement("button");
            E.classList.add("btn", "btn-secondary"),
                E.setAttribute("type", "button"),
                E.setAttribute("data-dismiss", "modal"),
                p.classList.add("text-center"),
                (E.textContent = "Close"),
                p.appendChild(f),
                p.appendChild(b),
                p.appendChild(g),
                p.appendChild(L),
                m.appendChild(E),
                r.appendChild(c),
                r.appendChild(p),
                r.appendChild(m),
                d.appendChild(r),
                (s.innerHTML = ""),
                s.appendChild(d),
                console.log(s),
                $("#modal-Container").modal("show"),
                document.addEventListener("keydown", function (e) {
                    "Escape" === e.key && l();
                }),
                window.addEventListener("click", function (e) {
                    e.target === s && l();
                });
        });
    }
    function l() {
        $("#modal-Container").modal("hide");
    }
    function d() {
        return e;
    }
    function r() {
        return fetch(t)
            .then(function (e) {
                return e.json();
            })
            .then(function (e) {
                e.results.forEach(function (e) {
                    n({ name: e.name, detailsUrl: e.url });
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    function c(e) {
        return fetch(e.detailsUrl)
            .then(function (e) {
                return e.json();
            })
            .then(function (t) {
                console.log(t.sprites.front_default),
                    (e.height = t.height),
                    (e.type = t.types),
                    (e.abilities = t.abilities),
                    (e.img = t.sprites.front_default);
            })
            .catch(function (e) {
                console.error(e);
            });
    }
    return {
        getAll: d,
        add: n,
        findPokemonByName: i,
        showPokemon: o,
        showDetails: s,
        addEventToButton: a,
        loadList: r,
    };
})();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach((e) => {
        pokemonRepository.showPokemon(e);
    });
});
