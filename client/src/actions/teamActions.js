const apiUrl = import.meta.env.VITE_API_URL;
import { toast } from "sonner";

const inviteUserToTeam = async (inviteMeta, setOpen) => {
  console.log(inviteMeta);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token missing!");
    }

    const response = await fetch(`${apiUrl}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inviteMeta),
    });

    if (response.ok) {
      toast.success("Invitation sent successfully");
      setOpen(false);
    } else {
      throw new Error("Failed to send invite");
    }
  } catch (error) {
    console.error("Error sending invite:", error);
    toast.error("Failed to send invite");
  }
};

const respondToInvite = async (inviteId, inviteRes, setInvites) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token missing!");
    }

    const response = await fetch(`${apiUrl}/respond-invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ inviteId, inviteRes }),
    });

    if (response.ok) {
      setInvites((invites) =>
        invites.filter((invite) => invite._id !== inviteId)
      );
    } else {
      throw new Error("Failed to respond to invite");
    }
  } catch (error) {
    console.error("Error responding to invite:", error);
    toast.error("Failed to respond to invite");
  }
};

const fetchAllInvites = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token missing!");
    }

    const response = await fetch(`${apiUrl}/fetch-all-invites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch invites");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching invites:", error);
    throw error; // Re-throw to handle in NotificationPanel
  }
};

export { inviteUserToTeam, respondToInvite, fetchAllInvites };
