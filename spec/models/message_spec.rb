require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    # 'messageを保存できる場合' 
    context 'can save' do
      # 'contentがあれば保存できること' 
      it 'can save' do
        expect(build(:message, image: nil)).to be_valid
      end
      # 'imageがあれば保存できること' 
      it 'is valid with image' do
        expect(build(:message, content: nil)).to be_valid
      end
      # 'content と imageがあれば保存できること' 
      it 'is valid with content and image' do
        expect(build(:message)).to be_valid
      end
    end

    # 'messageを保存できない場合' 
    context 'can not save' do
      # ' content と imageが両方空だと保存できないこと' 
      it 'is invalid without content and image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end
      # 'group_idが無いと保存できないこと' 
      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
      # ' user_idが無いと保存できないこと' 
      it 'is invaid without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end