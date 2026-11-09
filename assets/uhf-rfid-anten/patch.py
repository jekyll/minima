import numpy as np
from scipy.integrate import quad
from scipy.special import j0

# Input parameters — all lengths in metres
c = 3e8
f0 = 866.5e6
er = 4.4
h = 1.6e-3
t = 35e-6
Z0 = 50

# 1. Patch width
W = c / (2 * f0 * np.sqrt((er + 1) / 2))

# 2. Effective dielectric constant
e_eff = (
    (er + 1) / 2
    + (er - 1) / 2 * (1 + 12 * h / W)**(-0.5)
)

# 3. Effective patch length
L_eff = c / (2 * f0 * np.sqrt(e_eff))

# 4. Fringing-field length extension at each radiating edge
dL = (
    0.412 * h
    * ((e_eff + 0.3) * (W / h + 0.264))
    / ((e_eff - 0.258) * (W / h + 0.8))
)

# 5. Physical patch length
L = L_eff - 2 * dL

# 6. Approximate 50-ohm feed-line width — your original formula
feed_w = (
    5.98 * h / np.exp(Z0 * np.sqrt(er + 1.41) / 87) - t
) / 0.8

# 7. Estimate patch edge resistance using the two-radiating-edge model
k0 = 2 * np.pi * f0 / c

def slot_integrand(theta):
    a = k0 * W / 2

    # np.sinc(x) = sin(pi*x)/(pi*x).
    # This form avoids division by zero at theta = pi/2.
    return (
        (a * np.sinc(a * np.cos(theta) / np.pi))**2
        * np.sin(theta)**3
    )

# Self radiation conductance
G1 = quad(slot_integrand, 0, np.pi)[0] / (120 * np.pi**2)

# Mutual radiation conductance
G12 = quad(
    lambda theta: (
        slot_integrand(theta) * j0(k0 * L * np.sin(theta))
    ),
    0, np.pi
)[0] / (120 * np.pi**2)

R_edge = 1 / (2 * (G1 + G12))

# 8. Initial inset length — cosine-squared approximation
if not 0 < Z0 <= R_edge:
    raise ValueError("Target impedance is outside this inset model's range.")

cut_l = (L / np.pi) * np.arccos(np.sqrt(Z0 / R_edge))

# 9. Initial inset width — CHOSEN ratio, not an exact matching formula
notch_to_feed_ratio = 3.0
cut_w = notch_to_feed_ratio * feed_w
gap = (cut_w - feed_w) / 2

# Results
print(f"Patch width W:          {W * 1000:.2f} mm")
print(f"Patch length L:         {L * 1000:.2f} mm")
print(f"Effective permittivity: {e_eff:.4f}")
print(f"Feed width:             {feed_w * 1000:.2f} mm")
print(f"Estimated edge R:       {R_edge:.2f} ohms")
print(f"Initial inset cut_l:    {cut_l * 1000:.2f} mm")
print(f"Initial notch cut_w:    {cut_w * 1000:.2f} mm")
print(f"Gap on EACH side:       {gap * 1000:.2f} mm")
