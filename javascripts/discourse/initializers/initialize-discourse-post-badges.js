import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "add-user-level-icon",

  initialize() {
    withPluginApi("0.8.25", (api) => {
      api.decorateWidget("user-name:before", (dec) => {
        const user = dec.attrs.user;
        // const imageUrl = user?.user_level_image_url; // 실제 이미지 로직은 잠시 비활성화

        // 테스트용 빨간 div 출력
        return dec.h("div", {
          style:
            "width: 16px; height: 16px; background-color: red; margin-right: 4px; display: inline-block; vertical-align: middle;",
        });
      });
    });
  },
};
