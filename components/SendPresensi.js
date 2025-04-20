export const sendPresensi = async (nim, token, setStatus, navigation) => {
  setStatus("Mengirim...");

  try {
    const response = await fetch("https://api.itera.ac.id/v2/presensi/kelas", {
      method: "POST",
      headers: {
        "User-Agent": "Dart/3.2 (dart:io)",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
      },
      body: new URLSearchParams({
        token: token,
        nim: nim,
      }).toString(),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (response.ok) {
      setStatus(`✅ Berhasil: ${data.msg || "Presensi berhasil!"}`);
      navigation.popTo("Home", { showModal: Date.now() });
    } else {
      setStatus(`❌ Gagal: ${data.msg || "Terjadi kesalahan."}`);
      navigation.popTo("Home", { showModal: Date.now() });
    }
  } catch (error) {
    setStatus("❌ Gagal: Periksa koneksi internet.");
  }
};
