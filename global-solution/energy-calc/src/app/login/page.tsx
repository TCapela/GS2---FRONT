"use client";

import { useState } from "react";
import LoginModal from "@/components/LoginModal/LoginModal";

export default function LoginPage() {
  const [isModalVisible, setModalVisible] = useState(true);

  return (
    <div>
      <LoginModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}
