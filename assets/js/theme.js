function loadPreferredTheme() {
    const preferredTheme = localStorage.getItem("pref-theme");
    const isDarkTheme = document.body.classList.contains("dark");

    if (preferredTheme === "light" && isDarkTheme) {
        document.body.classList.remove('dark')
    } else if (preferredTheme === "dark" && !isDarkTheme) {
        document.body.classList.add('dark')
    }
}

function scrollToTop() {
    const topButton = document.getElementById("top-link");

    document.addEventListener('scroll', () => {
        if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
            topButton.style.visibility = "visible";
            topButton.style.opacity = "1";
        } else {
            topButton.style.visibility = "hidden";
            topButton.style.opacity = "0";
        }
    })
}

function themeToggle() {
    const themeButton = document.getElementById("theme-toggle");

    themeButton.addEventListener("click", () => {
        if (document.body.className.includes("dark")) {
            document.body.classList.remove('dark');
            localStorage.setItem("pref-theme", 'light');
        } else {
            document.body.classList.add('dark');
            localStorage.setItem("pref-theme", 'dark');
        }
    })
}

function showCodeCopyButtons() {
    document.querySelectorAll('pre > code').forEach((codeblock) => {
        const container = codeblock.parentNode.parentNode;

        const copybutton = document.createElement('button');
        copybutton.classList.add('copy-code');
        copybutton.innerHTML = 'copy';

        function copyingDone() {
            copybutton.innerHTML = 'copied!';
            setTimeout(() => {
                copybutton.innerHTML = 'copy';
            }, 2000);
        }

        copybutton.addEventListener('click', () => {
            if ('clipboard' in navigator) {
                navigator.clipboard.writeText(codeblock.textContent);
                copyingDone();
                return;
            }

            const range = document.createRange();
            range.selectNodeContents(codeblock);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand('copy');
                copyingDone();
            } catch {
                console.error("Could not copy")
            };
            selection.removeRange(range);
        });

        if (container.classList.contains("highlight")) {
            container.appendChild(copybutton);
        } else if (container.parentNode.firstChild == container) {
            // td containing LineNos
        } else if (codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "TABLE") {
            // table containing LineNos and code
            codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(copybutton);
        } else {
            // code blocks not having highlight as parent class
            codeblock.parentNode.appendChild(copybutton);
        }
    });
}

function openToc() {
    const toc = document.getElementById("toc");

    if (!toc) return;

    if (window.innerWidth > 1500 && window.innerHeight > 800) {
        toc.open = true;
    }
}

function progressBar() {
    const bar = document.getElementById("progressBar");

    if (!bar) return;

    document.addEventListener('scroll', () => {
        let scrollPercent = document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        if (scrollPercent >= 99) { scrollPercent = 0 };
        bar.style.setProperty("--scrollAmount", scrollPercent + '%');
    })
}

loadPreferredTheme();
scrollToTop();
themeToggle();
showCodeCopyButtons();
openToc();
progressBar();