# name: discourse-representative-badge
# about: 사용자가 좋아요한 뱃지를 대표뱃지로 지정하여 post 옆에 표시
# version: 0.2
# authors: jonggil.kim


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


