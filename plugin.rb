# frozen_string_literal: true

# name: discourse-post-badges
# about: Adds custom badge display based on user fields and gamification level
# version: 0.1
# authors: ChatGPT

after_initialize do
  add_to_serializer(:post, :custom_badges) do
    fields = ["대표 뱃지1", "대표 뱃지2", "대표 뱃지3"]
    fields.map { |f| object.user&.custom_fields&.[](f) }.compact
  end

  add_to_serializer(:post, :gamification_level) do
    if defined?(DiscourseGamification::LevelHelper)
      DiscourseGamification::LevelHelper.progress_for(object.user_id)
    end
  end

  add_to_serializer(:post, :include_custom_badges?) { true }
  add_to_serializer(:post, :include_gamification_level?) { true }
end
