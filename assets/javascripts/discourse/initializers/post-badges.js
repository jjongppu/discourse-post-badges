import { withPluginApi } from "discourse/lib/plugin-api";
import { iconHTML } from "discourse/lib/icon-library";

export default {
  name: "add-favorite-badges-widget",

  initialize() {
    withPluginApi("0.8.25", (api) => {
      api.decorateWidget("poster-name:after", (helper) => {
        const post = helper.getModel();
        const badges = post?.favorite_badges;
        if (!badges?.length) return;

        console.log("🎖 favorite_badges:", badges);

        const badgeElements = badges.map((badge) => {
          let iconEl;

          if (badge.image) {
            iconEl = helper.h("img", {
              src: badge.image,
              width: "32",
              height: "32",
              style: "object-fit: contain; margin-right: 2px;"
            });
          } else if (badge.icon) {
            iconEl = helper.h("span", {
              className: "badge-icon",
              style: "margin-right: 2px;",
              innerHTML: iconHTML(badge.icon.replace("fa-", ""))
            });
          } else {
            return null;
          }

          return helper.h("span", {
            className: "favorite-badge",
            title: badge.description,
            style: "margin-right: 2px;"
          }, [iconEl]);
        }).filter(Boolean);

        return helper.h("span", { className: "poster-badges" }, badgeElements);
      });
    });
  }
};
