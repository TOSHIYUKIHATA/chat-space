require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do
    # 'ログインしている場合' 
    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end
      # '@messageに期待した値が入っていること' 
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end
      # '@groupに期待した値が入っていること' 
      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end
      # 'index.html.erb に遷移すること' 
      it 'redners index' do
        expect(response).to render_template :index
      end
    end
    # 'ログインしていない場合' 
    context 'not lig in' do
      before do
        get :index, params: { group_id: group.id }
      end
      # 'ログイン画面にリダイレクトすること' 
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end


  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    # 'ログインしている場合' 
    context 'log in' do
      before do
        login user
      end
      # '保存に成功した場合' 
      context 'can save' do
        subject {
          post :create,
          params: params
        }
        # 'messageを保存すること' 
        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end
        # 'group_messages_pathへリダイレクトすること' 
        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end
      # '保存に失敗した場合' 
      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }
        # 'messageを保存しないこと' 
        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end
        # 'index.html.hamlに遷移すること' 
        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end
    # 'ログインしていない場合' 
    context 'not log in' do
      # 'new_user_session_pathにリダイレクトすること' 
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end


