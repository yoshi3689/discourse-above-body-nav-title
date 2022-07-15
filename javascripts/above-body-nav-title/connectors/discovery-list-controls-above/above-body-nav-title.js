import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  setupComponent(attrs, component) {
    component.set("hideSidebar", true);

    component.set("showDropdown1", false);
    component.set("showDropdown2", false);
    component.set("showDropdown3", false);

    document.querySelector(".topic-list").classList.add("with-sidebar");

      withPluginApi("0.11", (api) => {
        api.onPageChange(() => {
          if (settings.enable_top_contributors) {
            if (this.discoveryList) {
              if (this.isDestroyed || this.isDestroying) {
                return;
              }
              component.set("isDiscoveryList", true);

              fetch(`/directory_items.json?period=yearly&order=likes_received`)
                .then((response) => response.json())
                .then((data) => {
                  component.set("hideSidebar", false);
                  this.set("topContributors", data.directory_items.slice(0, 5));
                });
            } else {
              component.set("isDiscoveryList", false);
            }
          }
          
          const dropdown1 = document.querySelector(".dropdown1");
          const dropdownIcon1 = document.querySelector(".showDropdown1");
          dropdownIcon1.addEventListener('click', () => {
            component.set("showDropdown1", !component.showDropdown1);
            if (component.showDropdown1) {
              dropdownIcon1.classList.add('dropdown-icon1-open');
              dropdown1.classList.add('dropdown1-open');
            } else {
              dropdownIcon1.classList.remove('dropdown-icon1-open');
              dropdown1.classList.remove('dropdown1-open');
            }
          });

          const dropdown2 = document.querySelector(".dropdown2");
          const dropdownIcon2 = document.querySelector(".showDropdown2");
          dropdownIcon2.addEventListener('click', () => {
            component.set("showDropdown2", !component.showDropdown2);
            if (component.showDropdown2) {
              dropdownIcon2.classList.add('dropdown-icon2-open');
              dropdown2.classList.add('dropdown2-open');
            } else {
              dropdownIcon2.classList.remove('dropdown-icon2-open');
              dropdown2.classList.remove('dropdown2-open');
            }
          });

          const onPreviousClick = () => {
            counter > 0  ? setCounter(counter - 1) : setCounter(items.length - 1);
            console.log(counter, items.length);
          };
          const onNextClick = () => {
            counter < items.length - 1 ? setCounter(1 + counter) : setCounter(0);
            console.log(counter);
          };
        
          const onDotClick = ({ target }) => {
            if (target.classList[0]) {
              console.log(target.classList[1])
              setCounter(target.classList[1])
            } else if (target.parentNode.classList[0]) {
              console.log(target.parentNode.classList)
              setCounter(target.parentNode.classList[1])
            }
          }


        });
      });
  },
};
