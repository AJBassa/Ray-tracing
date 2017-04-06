#include <iostream>
using namespace std;

class Vector {
	public:
	double x, y, z;
	
	Vector(double _x, double _y, double _z)
	{
		x = _x;
		y = _y;
		z = _z;
	}
	
	Vector operator+(Vector v)
	{
		return Vector(this->x + v.x, this->y + v.y, this->z + v.z);
	}
	
	Vector operator-(Vector v)
	{
		return Vector(this->x - v.x, this->y - v.y, this->z - v.z);
	}

	Vector operator*(Vector v)
	{
		return Vector(this->x * v.x, this->y * v.y, this->z * v.z);
	}
	
	Vector operator/(Vector v)
	{
		return Vector(this->x / v.x, this->y / v.y, this->z / v.z);
	}


};

int main()
{
	cout << "Hello World!" << endl;
	Vector v = Vector(0.001, 1.20, 0.584 );
	Vector v2 = Vector(1.5412, 8.54, 0.41);
	Vector v3 = Vector(1.5, 1.5, 1.5);
	Vector v4 = Vector(2.0, 2.0, 2.0);
	Vector v5 = v + v2;
	Vector v6 = v3/v4;
	cout << "X-coord: "<< v3.x << endl;
	cout << "Y-coord: "<< v3.y << endl;
	cout << "Y-coord: "<< v3.z << endl;
	cout << "--------" << endl;
	cout << "X-coord: "<< v6.x << endl;
	cout << "Y-coord: "<< v6.y << endl;
	cout << "Y-coord: "<< v6.z << endl;	
	return 0;
}
