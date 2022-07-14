import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  setupComponent(attrs, component) {
    component.set("hideSidebar", true);

    this.set("showDropdown1", false);
    this.set("showDropdown2", false);
    this.set("showDropdown3", false);

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
          
          const dropdownIcon1 = document.querySelector(".showDropdown1");
          dropdownIcon1.addEventListener('click', () => {
            this.set("showDropdown1", !this.showDropdown1);
            let dropdownIcon2 = document.querySelector(".showDropdown2");
            dropdownIcon2.addEventListener('click', () => {
              this.set("showDropdown2", !this.showDropdown2);
            });
          });


        });
      });
  },
};
