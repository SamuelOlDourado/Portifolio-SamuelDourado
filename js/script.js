let tamanhoFonte = 16;
let modoAtivo = false;

//tamanho fonte
function mudarFonte(parametro) {
  const minSize = 12;
  const maxSize = 24;

  if (parametro === "+") {
    tamanhoFonte = Math.min(tamanhoFonte + 2, maxSize);
  } else {
    tamanhoFonte = Math.max(tamanhoFonte - 2, minSize);
  }

  document.documentElement.style.fontSize = tamanhoFonte + "px";
  localStorage.setItem("tamanhoFonte", tamanhoFonte);
}

//monocromático
function modoMonocromatico() {
  modoAtivo = !modoAtivo;
  document.documentElement.classList.toggle("monocromatico", modoAtivo);

  if (modoAtivo) {
    localStorage.setItem("modoMonocromatico", "ativo");
  } else {
    localStorage.removeItem("modoMonocromatico");
  }
}


document.addEventListener("DOMContentLoaded", function () {

//contato
  const formContato = document.getElementById("formContato");

  if (formContato) {
    formContato.addEventListener("submit", function (event) {

      if (!formContato.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      formContato.classList.add("was-validated");
    });
  }

//scroll reveal
const elementosRevelar = document.querySelectorAll(".revelar");

  function verificarScroll() {
    elementosRevelar.forEach(elemento => {
      const elementoTop = elemento.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementoTop < windowHeight - 100) {
        elemento.classList.add("ativo");
      }
    });
  }

  verificarScroll();
  window.addEventListener("scroll", verificarScroll);

//navegacao suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth"
          });

          history.pushState(null, "", href);
          atualizarMenuAtivo(targetId);
        }
      }
    });
  });

//menu ativo
  function atualizarMenuAtivo(sectionId) {
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
      link.classList.remove("item_ativo");
      link.classList.add("item_menu");

      const linkHref = link.getAttribute("href");
      if (linkHref === `#${sectionId}` || linkHref === `index.html#${sectionId}`) {
        link.classList.remove("item_menu");
        link.classList.add("item_ativo");
      }
    });
  }

  function verificarSecaoAtiva() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        atualizarMenuAtivo(sectionId);
      }
    });
  }

  window.addEventListener("scroll", verificarSecaoAtiva);

//salvar
  function carregarPreferencias() {
    const fonteSalva = localStorage.getItem("tamanhoFonte");
    if (fonteSalva) {
      tamanhoFonte = parseInt(fonteSalva, 10);
      document.documentElement.style.fontSize = tamanhoFonte + "px";
    }

    const modoSalvo = localStorage.getItem("modoMonocromatico");
    if (modoSalvo === "ativo") {
      document.documentElement.classList.add("monocromatico");
      modoAtivo = true;
    }
  }

  carregarPreferencias();
});
