document.addEventListener("DOMContentLoaded", function () {
  updateNav();
  protectPage();
  setupGlobalEvents();
});

function updateNav() {
  const user = JSON.parse(localStorage.getItem("user"));
  const loginLink = document.querySelector('a[href="login.html"]');

  if (!loginLink) return;

  if (user) {
    loginLink.textContent = "Sair";
    loginLink.href = "#";
    loginLink.onclick = function (e) {
      e.preventDefault();
      logout();
    };
  } else {
    loginLink.textContent = "Login";
    loginLink.href = "login.html";
    loginLink.onclick = null;
  }
}

function protectPage() {
  const page = window.location.pathname.split("/").pop();
  const protectedPages = ["painel.html"];
  const user = JSON.parse(localStorage.getItem("user"));

  if (protectedPages.includes(page) && !user) {
    alert("Acesso negado! Faça login.");
    window.location.href = "login.html";
  }
}

function logout() {
  if (confirm("Deseja sair?")) {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  }
}

function resetPassword() {
  alert("Entre em contato no WhatsApp para redefinir sua senha.");
}

function openPixModal(plano, valor) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Faça login para comprar.");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("pix-plano").textContent = plano;
  document.getElementById("pix-valor").textContent = valor.toFixed(2);
  document.getElementById("pix-modal").style.display = "flex";

  localStorage.setItem("planoAtual", plano);
  localStorage.setItem("valorAtual", valor);
}

function closePixModal() {
  document.getElementById("pix-modal").style.display = "none";
}

function copyPix() {
  const chave = "centralcityrp@pix.com.br";
  navigator.clipboard.writeText(chave)
    .then(() => alert("Chave copiada: " + chave))
    .catch(() => alert("Erro ao copiar. Copie manualmente."));
}

function setupGlobalEvents() {
  window.onclick = function (e) {
    const modal = document.getElementById("pix-modal");
    if (e.target === modal) closePixModal();
  };

  document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (password === "123456") {
      const user = {
        username,
        coins: 0,
        lastPlan: "Nenhum",
        compras: []
      };
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "painel.html";
    } else {
      alert("Senha inválida! Use 123456 para testar.");
    }
  });
}

// Registrar compra (simulação)
function registrarCompra(plano, valor) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  user.compras.push({
    plano, valor, data: new Date().toLocaleDateString("pt-BR")
  });
  user.coins += Math.floor(valor * 100);
  user.lastPlan = plano;

  localStorage.setItem("user", JSON.stringify(user));
  alert(`${Math.floor(valor * 100)} coins adicionados!`);
}