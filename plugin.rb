# name: discourse-representative-badge
# about: 게시글에 대표 배지1~3 표시용 커스텀 필드 전달
# version: 0.1
# authors: 쫑뿌

after_initialize do
  add_to_serializer(:post, :favorite_badges) do
    if (user = object.user)
      UserBadge
        .includes(badge: :image_upload)
        .where(user_id: user.id, is_favorite: true)
        .order("user_badges.id")
        .limit(3)
        .map(&:badge)
        .map do |badge|
          {
            id: badge.id,
            name: badge.name,
            slug: badge.slug,
            icon: badge.icon,
            image: badge.image_upload&.url,
            description: badge.description,
            badge_type_id: badge.badge_type_id,
            badge_grouping_id: badge.badge_grouping_id
          }
        end
    else
      []
    end
  end
end


