# name: discourse-representative-badge
# about: 게시글에 대표 배지1~3 표시용 커스텀 필드 전달
# version: 0.1
# authors: 쫑뿌

register_asset "javascripts/discourse/initializers/post-badges.js"


after_initialize do
  add_to_serializer(:post, :favorite_badges) do
    if (user = object.user)
      UserBadge
        .includes(:badge)
        .where(user_id: user.id, is_favorite: true)
        .order("user_badges.id")
        .limit(3)
        .map do |user_badge|
          badge = user_badge.badge
          {
            id: badge.id,
            name: badge.name,
            description: badge.description,
            image: badge.image_upload&.url,
            icon: badge.icon,
            slug: badge.slug,
            badge_grouping_id: badge.badge_grouping_id,
            badge_type_id: badge.badge_type_id,
          }
        end
    else
      []
    end
  end
end


