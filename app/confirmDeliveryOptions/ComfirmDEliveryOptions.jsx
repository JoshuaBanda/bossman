'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles/confirmDeliveryOptions.module.css';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const ConfirmDeliveryOptions = () => {
  // Meal and user info
  const [meal, setMeal] = useState(null);
  const [user, setUser] = useState(null);
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  useEffect(() => {
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data));
        setMeal(parsed.meal);
        setUser(parsed.user);
      } catch (e) {
        console.error("Failed to parse payload", e);
      }
    }
  }, [data]);

  // Form state
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const hostels = ["Chilunga", "Kamuzu", "Sangala", "Chingwe", "Umodzi"];
  const times = ["11am", "12pm", "3pm", "5pm", "7pm", "8pm"];
  const paymentMethods = ["Pay online", "Pay cash to waiter", "Deduct from wallet"];

  // Update available rooms when hostel changes
  useEffect(() => {
    let rooms = [];
    switch (hostel) {
      case "Chilunga":
        rooms = Array.from({ length: 150 }, (_, i) => i + 1);
        break;
      case "Kamuzu":
        rooms = Array.from({ length: 100 }, (_, i) => i + 1);
        break;
      case "Sangala":
        rooms = Array.from({ length: 120 }, (_, i) => i + 1);
        break;
      case "Chingwe":
        rooms = Array.from({ length: 80 }, (_, i) => i + 1);
        break;
      case "Umodzi":
        rooms = Array.from({ length: 50 }, (_, i) => i + 1);
        break;
      default:
        rooms = [];
    }
    setAvailableRooms(rooms);
    setRoom(""); // reset selected room
  }, [hostel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ hostel, room, deliveryTime, paymentMethod });
    // Send info to server or navigate to next step
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sideBar} id='baseBackgroundColor'>
        {meal && (
          <div className={styles.mealContainer}>
            <Image
              src={meal.photo}
              width={150}
              height={150}
              priority
              alt={meal.mealName || 'meal'}
            />
            <div className={styles.mealName}>{meal.mealName}</div>
            <div className={styles.quantity}>quantity: <span>{meal.quantity}</span></div>
            <div className={styles.price} id='primaryColorTwo'>
              Mk {meal.price * meal.quantity}
            </div>
          </div>
        )}
        {user && (
          <div className={styles.userInformation}>
            <div className={styles.userName}>{user.firstName} {user.lastName}</div>
            <div className={styles.userEmail}>{user.email}</div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        <div className={styles.primaryColorTop} id='primaryBackgroundColorTwo' />

        <div className={styles.header}>
          {user && <span>{user.firstName} </span>}
          confirm your <span>delivery and payment</span> option
        </div>

        <div className={styles.formContainer}>
          <form className={styles.confirmationForm} onSubmit={handleSubmit}>
            {/* Hostel dropdown */}
            <label>
              Choose Hostel:
              <select value={hostel} onChange={(e) => setHostel(e.target.value)} required>
                <option value="" disabled>Select hostel</option>
                {hostels.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </label>

            {/* Room dropdown */}
            {hostel && availableRooms.length > 0 && (
              <label>
                Choose Room:
                <select value={room} onChange={(e) => setRoom(e.target.value)} required>
                  <option value="" disabled>Select room</option>
                  {availableRooms.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </label>
            )}

            {/* Delivery time */}
            <label>
              Delivery Time:
              <select value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} required>
                <option value="" disabled>Select time</option>
                {times.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            {/* Payment method */}
            <label>
              Payment Method:
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                <option value="" disabled>Select payment</option>
                {paymentMethods.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </label>

            <button type="submit" id='primaryBackgroundColorTwo'>Confirm Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeliveryOptions;
