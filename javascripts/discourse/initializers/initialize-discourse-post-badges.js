import { schedule } from "@ember/runloop";
import { iconHTML } from "discourse/lib/icon-library";
import { withPluginApi } from "discourse/lib/plugin-api";

const BADGE_CLASS = [
  "badge-type-gold",
  "badge-type-silver",
  "badge-type-bronze",
];

const TRUST_LEVEL_BADGE = ["basic", "member", "regular", "leader"];

<<<<<<< HEAD
const USER_BADGE_PAGE = "user's badge page";

function buildLevelBadge(image) {
  if (!image) {
    return null;
  }

  const img = document.createElement("img");
  img.setAttribute("src", image);
  const span = document.createElement("span");
  span.classList.add("poster-icon");
  span.classList.add("level-badge");
  span.appendChild(img);
  return span;
}

=======
>>>>>>> b9abbfa (출력 기준 변경)
function buildBadge(badge) {
  let iconBody;

  if (badge.image) {
    const img = document.createElement("img");
    img.setAttribute("src", badge.image);
    iconBody = img.outerHTML;
  } else if (badge.icon) {
    iconBody = iconHTML(badge.icon);
  } else if (badge.text) {
    iconBody = badge.text;
  }

  if (badge.url) {
    const link = document.createElement("a");
    link.setAttribute("href", badge.url);
    link.innerHTML = iconBody;
    iconBody = link;
  }

  const span = document.createElement("span");
  span.classList.add("poster-icon");
  span.classList.add(badge.className);
  if (badge.id >= 1 && badge.id <= 4) {
    span.classList.add(TRUST_LEVEL_BADGE[badge.id - 1]);
  }
  span.setAttribute("title", badge.title);
  span.appendChild(iconBody);
  return span;
}

function prepareRepresentativeBadges(allBadges, names = []) {
  const lowerNames = names.filter(Boolean).map((n) => n.toLowerCase());

  return allBadges
    .filter((badge) => lowerNames.includes(badge.name.toLowerCase()))
    .map((badge) => ({
      icon: badge.icon?.replace("fa-", ""),
      image: badge.image_url || badge.image,
      className: BADGE_CLASS[badge.badge_type_id - 1],
      name: badge.slug,
      id: badge.id,
      badgeGroup: badge.badge_grouping_id,
      title: badge.description,
      url: `/badges/${badge.id}/${badge.slug}`,
    }));
}

function prepareTextBadges(names) {
  return names.filter(Boolean).map((name) => {
    return {
      text: name,
      title: name,
      className: "custom-text-badge",
    };
  });
}

function appendBadges(badges, decorator, levelImage) {
  const selector = `[data-post-id="${decorator.attrs.id}"] .poster-icon-container`;

  let trustLevel = "";
  let highestBadge = 0;
  const badgesNodes = [];
  const levelNode = buildLevelBadge(levelImage);
  if (levelNode) {
    badgesNodes.push(levelNode);
  }
  badges.forEach((badge) => {
    badgesNodes.push(buildBadge(badge));
    if (badge.badgeGroup === 4 && badge.id > highestBadge) {
      highestBadge = badge.id;
      trustLevel = `${TRUST_LEVEL_BADGE[highestBadge - 1]}-highest`;
    }
  });

  schedule("afterRender", () => {
    const postContainer = document.querySelector(selector);
    if (postContainer) {
      postContainer.innerHTML = "";
      trustLevel && postContainer.classList.add(trustLevel);
      badgesNodes.forEach((badgeNode) => postContainer.appendChild(badgeNode));
    }
  });
}

export default {
  name: "discourse-post-badges",

  initialize(container) {
    withPluginApi("0.8.25", (api) => {
      const isMobileView = container.lookup("service:site").mobileView;
      const location = isMobileView ? "before" : "after";
<<<<<<< HEAD
      api.decorateWidget(`poster-name:${location}`, (decorator) => {
        const post = decorator.widget.findAncestorModel();
        if (post) {
          let badges = [];
          if (post.custom_badges) {
            badges = prepareTextBadges(post.custom_badges);
          } else if (post.userBadges) {
            const displayedBadges = settings.badges
              .split("|")
              .filter(Boolean)
              .map((badge) => badge.toLowerCase());
            badges = prepareBadges(
              post.userBadges,
              displayedBadges,
              post.username
            );
          }

          const levelImage = post.gamification_level?.image_url;

          appendBadges(badges, decorator, levelImage);

=======

      api.decorateWidget(`poster-name:${location}`, (decorator) => {
        const post = decorator.widget.findAncestorModel();
        if (post?.userBadges) {
          const preparedBadges = prepareRepresentativeBadges(post.userBadges, [
            post.representative_badge_1,
            post.representative_badge_2,
            post.representative_badge_3,
          ]);

          appendBadges(preparedBadges, decorator);
>>>>>>> b9abbfa (출력 기준 변경)
          return decorator.h("div.poster-icon-container", {}, []);
        }
      });
    });
  },
};
