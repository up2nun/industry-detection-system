import pandas as pd
import numpy as np

# Задаем количество строк данных
n_samples = 1000

# Генерируем случайные данные
np.random.seed(42)  # Для воспроизводимости результатов

data = {
    'Время': pd.date_range(start='2024-01-01', periods=n_samples, freq='H'),
    'Адрес источника': ['.'.join(map(str, np.random.randint(0, 256, size=4))) for _ in range(n_samples)],
    'Порт источника': np.random.randint(1, 65536, size=n_samples),
    'Адрес назначения': ['.'.join(map(str, np.random.randint(0, 256, size=4))) for _ in range(n_samples)],
    'Порт назначения': np.random.randint(1, 65536, size=n_samples),
    'Протокол': np.random.choice(['TCP', 'UDP', 'ICMP'], size=n_samples),
    'Состояние соединения': np.random.choice(['SF', 'S0', 'REJ'], size=n_samples),
    'Отправленные байты': np.random.randint(1, 10000, size=n_samples),
    'Принятые байты': np.random.randint(1, 10000, size=n_samples),
    'Класс': np.random.choice(['Нормальный', 'Аномальный'], size=n_samples)
}

# Создаем DataFrame
df = pd.DataFrame(data)

# Сохраняем данные в файл CSV
df.to_csv('Dataset.csv', index=False)
