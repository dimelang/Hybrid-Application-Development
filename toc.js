// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="pendahuluan.html"><strong aria-hidden="true">1.</strong> Pendahuluan</a></li><li class="chapter-item expanded "><a href="pengenalan-typescript.html"><strong aria-hidden="true">2.</strong> TypeScript</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="membuat-dan-menjalankan-program-typescript.html"><strong aria-hidden="true">2.1.</strong> Membuat dan Menjalankan Program TypeScript</a></li><li class="chapter-item expanded "><a href="tipe-data-dasar.html"><strong aria-hidden="true">2.2.</strong> Tipe Data Dasar</a></li><li class="chapter-item expanded "><a href="tipe-data-dasar-lanjutan.html"><strong aria-hidden="true">2.3.</strong> Tipe Data Dasar Lanjutan</a></li><li class="chapter-item expanded "><a href="function-parameter.html"><strong aria-hidden="true">2.4.</strong> Function &amp; Parameter</a></li><li class="chapter-item expanded "><a href="object-interface.html"><strong aria-hidden="true">2.5.</strong> Object &amp; Interface</a></li><li class="chapter-item expanded "><a href="union-intersection.html"><strong aria-hidden="true">2.6.</strong> Union &amp; Intersection</a></li><li class="chapter-item expanded "><a href="generics.html"><strong aria-hidden="true">2.7.</strong> Generics</a></li><li class="chapter-item expanded "><a href="class-oop-dasar.html"><strong aria-hidden="true">2.8.</strong> Class &amp; OOP Dasar</a></li><li class="chapter-item expanded "><a href="module-import-export.html"><strong aria-hidden="true">2.9.</strong> Module &amp; Import/Export</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> React Native</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="setup-environment.html"><strong aria-hidden="true">3.1.</strong> Setup Environment</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="react-native-cli.html"><strong aria-hidden="true">3.1.1.</strong> React Native CLI</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="react-native-cli-android.html"><strong aria-hidden="true">3.1.1.1.</strong> Android</a></li><li class="chapter-item expanded "><a href="react-native-cli-ios.html"><strong aria-hidden="true">3.1.1.2.</strong> iOS</a></li></ol></li><li class="chapter-item expanded "><a href="expo-go.html"><strong aria-hidden="true">3.1.2.</strong> Expo Go</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.</strong> Hello World App</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="hello-world-app-react-native-cli.html"><strong aria-hidden="true">3.2.1.</strong> React Native CLI</a></li><li class="chapter-item expanded "><a href="hello-world-app-expo.html"><strong aria-hidden="true">3.2.2.</strong> Expo</a></li></ol></li><li class="chapter-item expanded "><a href="struktur-proyek-react-native.html"><strong aria-hidden="true">3.3.</strong> Struktur Proyek React Native</a></li><li class="chapter-item expanded "><a href="komponen-react-native.html"><strong aria-hidden="true">3.4.</strong> Komponen</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="component-view.html"><strong aria-hidden="true">3.4.1.</strong> View</a></li><li class="chapter-item expanded "><a href="component-text.html"><strong aria-hidden="true">3.4.2.</strong> Text</a></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
