# name: discourse-representative-badge
# about: 게시글에 대표 배지1~3 표시용 커스텀 필드 전달
# version: 0.1
# authors: 쫑뿌

  after_initialize do
    %w[대표 배지1 대표 배지2 대표 배지3].each_with_index do |field, idx|
      add_to_serializer(:post, "representative_badge_#{idx + 1}".to_sym) do
        object.user&.custom_fields[field]
      end
    end
  end
  
  add_to_serializer(:user_card, :gamification_level_info) do
    begin
      DiscourseGamification::LevelHelper.progress_for(object.id)
    rescue => e
      Rails.logger.error("Gamification Level Error: #{e.message}")
      nil
    end
  end