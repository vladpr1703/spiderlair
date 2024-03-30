import { keccak256, toHex } from 'viem';

const API_URL = 'https://skadyxd-spiderhack-fast-api-backend-3-8-210d.twc1.net';

export const sendMessage = async ({
  txHash,
  message,
  onFinish,
  onSuccess,
}: {
  txHash: string;
  message: string;
  onFinish?: VoidFunction;
  onSuccess?: VoidFunction;
}) => {
  try {
    await fetch(`${API_URL}/send_message_special_endpoint`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        transaction_hash: txHash,
        message_hash: keccak256(toHex(message)),
        message: message,
      }),
    });
    onSuccess?.();
  } catch (e) {
    console.log(e);
  } finally {
    onFinish?.();
  }
};

export const fetchMessages = async ({
  senderAddress,
  recieverAddress,
  onSuccess,
  onFinish,
}: {
  senderAddress: string;
  recieverAddress: string;
  onSuccess?: VoidFunction;
  onFinish?: VoidFunction;
}) => {
  try {
    const response = await fetch(
      `${API_URL}/get_messages_endpoint/${senderAddress}/${recieverAddress}`
    );
    const result = await response.json();
    onSuccess?.();
    return result;
  } catch (e) {
    console.log(e);
  } finally {
    onFinish?.();
  }
};

export const fetchContacts = async ({ address }: { address: string }) => {
  try {
    const response = await fetch(`${API_URL}/get_contacts_special/${address}`);
    const res = await response.json();
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const createNickname = async ({
  userAddress,
  friendAddress,
  nickname,
  onSuccess,
}: {
  userAddress: string;
  friendAddress: string;
  nickname: string;
  onSuccess?: VoidFunction;
}) => {
  try {
    const response = await fetch(`${API_URL}/user/create_nickname`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user_address: userAddress,
        friend_address: friendAddress,
        nickname,
      }),
    });
    const res = await response.json();
    onSuccess?.();
    return res;
  } catch (e) {
    console.log(e);
  }
};
