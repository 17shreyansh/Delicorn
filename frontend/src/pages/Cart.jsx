import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Card,
  Button,
  Input,
  Radio,
  Space,
  InputNumber,
  Divider,
  Steps,
} from "antd";
import {
  DeleteOutlined,
  RightOutlined,
  PlusOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Step } = Steps;

const CartCheckout = () => {
  const [step, setStep] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState("home");
  const [payment, setPayment] = useState("upi");

  // Demo data
  const cartItems = [
    {
      id: 1,
      name: "Streamlined Sparkle Diamond Bangle",
      price: 8900,
      size: "45 * 55 MM",
      weight: "9.616 g",
      image:
        "https://via.placeholder.com/80x80.png?text=Bangle",
    },
    {
      id: 2,
      name: "Streamlined Sparkle Diamond Bangle",
      price: 8900,
      size: "45 * 55 MM",
      weight: "9.616 g",
      image:
        "https://via.placeholder.com/80x80.png?text=Bangle",
    },
  ];

  const subtotal = 2450;
  const shipping = 0;
  const couponApplied = 200;
  const walletUsed = 500;
  const total = subtotal - couponApplied - walletUsed;

  const styles = {
    page: { marginTop: 80, padding: "20px 60px", fontFamily: "'Josefin Sans', sans-serif", background: "#fff" },
    title: { textAlign: "center", marginBottom: 10 },
    card: {
      borderRadius: 10,
      border: "1px solid #ddd",
      padding: 20,
      background: "#fff",
    },
    sectionTitle: { fontWeight: 600, marginBottom: 10 },
    label: { fontWeight: 500 },
    summaryCard: {
      borderRadius: 8,
      border: "1px solid #ddd",
      background: "#fff",
      padding: "20px 20px 5px 20px",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 10,
      fontSize: 15,
    },
    divider: { margin: "8px 0" },
    couponBox: {
      display: "flex",
      alignItems: "center",
      marginTop: 20,
      gap: 10,
    },
    addressCard: (isActive) => ({
      border: isActive ? "1px solid #006d5b" : "1px solid #ddd",
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
      background: isActive ? "#f0fdf9" : "#fff",
    }),
    payRow: (isActive) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: isActive ? "1px solid #006d5b" : "1px solid #eee",
      borderRadius: 8,
      padding: "8px 12px",
      marginBottom: 10,
      background: isActive ? "#f0fdf9" : "#fff",
    }),
  };

  return (
    <Layout style={{ background: "#fff", fontFamily: "'Josefin Sans', sans-serif" }}>
      <div style={styles.page}>
        <Title level={2} style={styles.title}>
          Cart check out
        </Title>

        <Steps
          current={step}
          style={{ maxWidth: 500, margin: "0 auto 40px auto" }}
          items={[
            { title: "Cart" },
            { title: "Address & Payment" },
          ]}
        />

        {step === 0 ? (
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={16}>
              {cartItems.map((item, i) => (
                <Card key={i} style={styles.card}>
                  <Row align="middle" gutter={[16, 16]}>
                    <Col span={4}>
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    </Col>
                    <Col span={10}>
                      <Title level={5} style={{ marginBottom: 0 }}>
                        {item.name}
                      </Title>
                      <Text type="secondary">
                        Size: {item.size} | Weight: {item.weight}
                      </Text>
                      <br />
                      <Text strong>₹{item.price}</Text>
                    </Col>
                    <Col span={4} style={{ textAlign: "center" }}>
                      <Text>Quantity</Text>
                      <InputNumber min={1} max={5} defaultValue={1} />
                    </Col>
                    <Col span={6} style={{ textAlign: "right" }}>
                      <Text strong>₹{item.price}</Text>
                      <br />
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        style={{ marginTop: 5 }}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}

              <div style={styles.couponBox}>
                <Input
                  placeholder="COUPON"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button
                  icon={<RightOutlined />}
                  style={{
                    background: "#004d40",
                    color: "#fff",
                    borderRadius: 6,
                  }}
                >
                  APPLY
                </Button>
              </div>
            </Col>

            <Col xs={24} lg={8}>
              <Card style={styles.summaryCard}>
                <div style={styles.summaryRow}>
                  <span>ITEM(S) SUBTOTAL :</span>
                  <span>₹{subtotal}</span>
                </div>
                <Divider style={styles.divider} />
                <div style={styles.summaryRow}>
                  <span>SHIPPING :</span>
                  <span>FREE</span>
                </div>
                <Divider style={styles.divider} />
                <div style={styles.summaryRow}>
                  <span>TOTAL :</span>
                  <span>₹{subtotal}</span>
                </div>
                <Divider style={styles.divider} />
                <div style={styles.summaryRow}>
                  <span>COUPON | PROMO APPLIED:</span>
                  <span>-₹{couponApplied}</span>
                </div>
                <Divider style={styles.divider} />
                <div style={styles.summaryRow}>
                  <span>WALLET:</span>
                  <span>-₹{walletUsed}</span>
                </div>
                <Divider style={styles.divider} />
                <div
                  style={{
                    ...styles.summaryRow,
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  <span>NET FINAL AMOUNT :</span>
                  <span>₹{total}</span>
                </div>
              </Card>

              <Button
                type="primary"
                block
                style={{
                  background: "#004d40",
                  borderColor: "#004d40",
                  marginTop: 20,
                  height: 45,
                }}
                onClick={() => setStep(1)}
              >
                CHECK OUT
              </Button>

              <div style={{ marginTop: 15, textAlign: "center" }}>
                <Text style={{ color: "#777" }}>UPI / NETBANKING</Text>
                <br />
                <Text style={{ color: "#777" }}>
                  CASH ON DELIVERY (COD)
                </Text>
              </div>
            </Col>
          </Row>
        ) : (
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={16}>
              <div style={{ marginBottom: 30 }}>
                <div style={styles.sectionTitle}>SELECT ADDRESSES</div>
                <div
                  style={styles.addressCard(address === "home")}
                  onClick={() => setAddress("home")}
                >
                  <Radio checked={address === "home"} />
                  <div style={{ marginLeft: 10 }}>
                    <Text strong>HOME</Text>
                    <div>
                      B167, Vamika Pg , Jk Town, Kolar Road, Bhopal , Infront Of
                      Jk Hospital , Kolar Road, Bhopal, 462042 , Madhya Pradesh,
                      India
                    </div>
                    <div style={{ color: "#666" }}>
                      HARSHITA JAIN 8967777320
                    </div>
                  </div>
                </div>

                <div
                  style={styles.addressCard(address === "work")}
                  onClick={() => setAddress("work")}
                >
                  <Radio checked={address === "work"} />
                  <div style={{ marginLeft: 10 }}>
                    <Text strong>WORK</Text>
                    <div>
                      B167, Vamika Pg , Jk Town, Kolar Road, Bhopal , Infront Of
                      Jk Hospital , Kolar Road, Bhopal, 462042 , Madhya Pradesh,
                      India
                    </div>
                    <div style={{ color: "#666" }}>
                      HARSHITA JAIN 8966667770
                    </div>
                  </div>
                </div>

                <Button
                  icon={<PlusOutlined />}
                  style={{
                    borderColor: "#004d40",
                    color: "#004d40",
                    marginTop: 10,
                  }}
                >
                  Add Address
                </Button>
              </div>

              <div>
                <div style={styles.sectionTitle}>SELECT PAYMENT METHOD</div>
                {[
                  { id: "upi", label: "UPI" },
                  { id: "cod", label: "COD" },
                  { id: "netbanking", label: "NETBANKING" },
                  { id: "wallet", label: "WALLETS" },
                  { id: "card", label: "CREDIT/DEBIT CARD" },
                ].map((m) => (
                  <div
                    key={m.id}
                    style={styles.payRow(payment === m.id)}
                    onClick={() => setPayment(m.id)}
                  >
                    <Radio checked={payment === m.id}>{m.label}</Radio>
                    <RightOutlined />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 30 }}>
                <Button
                  onClick={() => setStep(0)}
                  style={{ marginRight: 10 }}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  style={{
                    background: "#004d40",
                    borderColor: "#004d40",
                  }}
                  onClick={() => alert("Order Placed!")}
                >
                  CHECK OUT
                </Button>
              </div>
            </Col>

            <Col xs={24} lg={8}>
              <Card style={styles.summaryCard}>
                <div style={styles.summaryRow}>
                  <span>ITEM(S) SUBTOTAL :</span>
                  <span>₹{subtotal}</span>
                </div>
                <Divider style={styles.divider} />
                <div style={styles.summaryRow}>
                  <span>SHIPPING :</span>
                  <span>FREE</span>
                </div>
                <Divider style={styles.divider} />
                <div style={styles.summaryRow}>
                  <span>TOTAL :</span>
                  <span>₹{subtotal}</span>
                </div>
                <Divider style={styles.divider} />
                <div style={styles.summaryRow}>
                  <span>COUPON | PROMO APPLIED:</span>
                  <span>-₹{couponApplied}</span>
                </div>
                <Divider style={styles.divider} />
                <div style={styles.summaryRow}>
                  <span>WALLET:</span>
                  <span>-₹{walletUsed}</span>
                </div>
                <Divider style={styles.divider} />
                <div
                  style={{
                    ...styles.summaryRow,
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  <span>NET FINAL AMOUNT :</span>
                  <span>₹{total}</span>
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default CartCheckout;
