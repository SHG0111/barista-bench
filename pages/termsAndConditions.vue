<template>
  <div class="page-top">
    <div class="container">
      <div class="page-header">
        <h1>Shipping Policy</h1>
        <p>Precision tools delivered with care.</p>
      </div>

      <div class="policy-content">
        <div class="policy-section">
          <h2>Shipping Methods</h2>
          <p>
            We offer complimentary express shipping on all orders. Your tools
            are packed with the same precision you expect in your craft.
          </p>
          <ul class="policy-list">
            <li>
              <strong>Express Worldwide Shipping:</strong> 3–7 business days
            </li>
            <li><strong>Order Processing:</strong> 1–2 business days</li>
            <li><strong>Tracking:</strong> Provided for every order</li>
          </ul>
        </div>

        <div class="policy-section">
          <h2>Shipping Restrictions</h2>
          <p>
            While we ship globally, certain regions require special handling.
          </p>
          <ul class="policy-list">
            <li>
              <strong>Restricted Countries:</strong> Please contact us for
              shipping availability to the following regions: Russia, Belarus,
              North Korea, Syria, Cuba.
            </li>
            <li>
              <strong>P.O. Boxes:</strong> We do not ship to P.O. Box addresses.
            </li>
          </ul>
        </div>

        <div class="policy-section">
          <h2>Customs and Duties</h2>
          <p>
            International orders may be subject to customs duties and taxes
            levied by the destination country. These charges are the sole
            responsibility of the customer.
          </p>
        </div>

        <div class="policy-section">
          <h2>Shipping Partners</h2>
          <p>
            We partner with leading logistics providers to ensure your equipment
            arrives safely and efficiently.
          </p>
          <ul class="policy-list">
            <li>DHL Express</li>
            <li>FedEx</li>
            <li>UPS</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-top {
  padding: 80px 0 60px;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-header h1 {
  font-size: 40px;
  margin-bottom: 12px;
}

.page-header p {
  font-size: 18px;
  color: var(--text-3);
}

.policy-content {
  max-width: 800px;
  margin: 0 auto;
}

.policy-section {
  margin-bottom: 40px;
}

.policy-section h2 {
  font-size: 24px;
  margin-bottom: 16px;
  color: var(--text-1);
}

.policy-section p {
  font-size: 16px;
  color: var(--text-3);
  line-height: 1.7;
  margin-bottom: 16px;
}

.policy-list {
  list-style: none;
  padding: 0;
}

.policy-list li {
  font-size: 16px;
  color: var(--text-3);
  margin-bottom: 10px;
  padding-left: 24px;
  position: relative;
}

.policy-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: bold;
}
</style>
